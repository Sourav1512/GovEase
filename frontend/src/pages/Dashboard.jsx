import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applicationsApi } from '../api/examsApi';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const navigation = [
  { label: 'Overview', to: '/dashboard', icon: '01' },
  { label: 'Explore opportunities', to: '/opportunities', icon: '02' },
  { label: 'Exams', to: '/exams', icon: '03' },
  { label: 'Government jobs', to: '/opportunities?type=Job', icon: '04' },
  { label: 'Scholarships', to: '/opportunities?type=Scholarship', icon: '05' },
  { label: 'Government schemes', to: '/opportunities?type=Scheme', icon: '06' },
  { label: 'My applications', to: '/applications', icon: '07' },
  { label: 'My documents', to: '/profile?section=documents', icon: '08' },
  { label: 'My profile', to: '/profile', icon: '09' },
];

const formatDate = (value) => {
  if (!value) return 'Date not available';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date not available' : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const titleFor = (application) => application.targetId?.title || application.targetId?.examName || application.targetId?.organization || (application.targetType === 'exam' ? 'Exam application' : 'Opportunity application');

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await applicationsApi.list();
      if (!response.success) throw new Error(response.message || 'Applications could not be loaded.');
      setApplications(response.items || []);
    } catch (loadError) {
      setError(loadError.message || 'Applications could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadApplications(); }, [loadApplications]);

  const pendingCount = applications.filter((item) => ['APPLIED', 'UNDER_REVIEW'].includes(item.status)).length;
  const approvedCount = applications.filter((item) => item.status === 'APPROVED').length;
  const rejectedCount = applications.filter((item) => item.status === 'REJECTED').length;

  return (
    <main className="citizen-dashboard">
      <aside className="citizen-dashboard-sidebar" aria-label="Citizen dashboard navigation">
        <div className="dashboard-sidebar-heading"><span>Citizen workspace</span><strong>My GovEase</strong></div>
        <nav>
          {navigation.map((item, index) => (
            <Link key={item.label} to={item.to} className={index === 0 ? 'dashboard-side-link active' : 'dashboard-side-link'} aria-current={index === 0 ? 'page' : undefined}>
              <span className="dashboard-side-index">{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="dashboard-signout" onClick={logoutUser}>Sign out</button>
      </aside>

      <section className="citizen-dashboard-main">
        <div className="citizen-dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">Your citizen workspace</span>
            <h1>Welcome{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}.</h1>
            <p>Keep an eye on your applications and continue exploring published opportunities.</p>
          </div>
          <Link to="/profile" className="dashboard-profile-link">
            <span className="dashboard-avatar">{user?.fullName?.charAt(0)?.toUpperCase() || 'C'}</span>
            <span><strong>{user?.fullName || 'Your profile'}</strong><small>{user?.email}</small></span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="dashboard-welcome-panel">
          <div>
            <span>Make your next move</span>
            <h2>Explore services that matter to you.</h2>
            <p>Check current notices, eligibility details and important dates before applying.</p>
          </div>
          <div className="dashboard-welcome-actions">
            <Link to="/opportunities" className="primary-btn">Explore opportunities</Link>
            <Link to="/exams" className="dashboard-secondary-link">Browse exams <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <section className="dashboard-data-section" aria-labelledby="application-overview-heading">
          <div className="dashboard-section-heading">
            <div><span className="dashboard-eyebrow">Application overview</span><h2 id="application-overview-heading">Your activity</h2></div>
            <Link to="/applications" className="text-link">View applications <span aria-hidden="true">→</span></Link>
          </div>
          {error && <div className="dashboard-load-error" role="alert"><span>{error}</span><button type="button" onClick={loadApplications}>Try again</button></div>}
          <div className="citizen-metric-grid">
            {[
              ['Total applications', applications.length, 'All submissions'],
              ['In progress', pendingCount, 'Submitted or under review'],
              ['Approved', approvedCount, 'Final approved decisions'],
              ['Not approved', rejectedCount, 'Final rejected decisions'],
            ].map(([label, value, note]) => (
              <article className="citizen-metric" key={label}>
                <span>{label}</span><strong>{loading ? '—' : value}</strong><small>{loading ? 'Loading your account data' : note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="dashboard-data-section recent-applications">
          <div className="dashboard-section-heading">
            <div><span className="dashboard-eyebrow">Latest updates</span><h2>Recent applications</h2></div>
            <Link to="/applications" className="text-link">Track all <span aria-hidden="true">→</span></Link>
          </div>
          {loading ? <div className="dashboard-empty-state" role="status">Loading your applications…</div> : applications.length ? (
            <div className="dashboard-application-list">
              {applications.slice(0, 4).map((application) => (
                <article className="dashboard-application-row" key={application._id}>
                  <div className="application-row-marker" aria-hidden="true" />
                  <div className="application-row-main"><strong>{titleFor(application)}</strong><span>Submitted {formatDate(application.createdAt || application.appliedAt)}</span></div>
                  <span className={`application-status status-${(application.status || 'unknown').toLowerCase().replace(/_/g, '-')}`}>{(application.status || 'Status unavailable').replace(/_/g, ' ')}</span>
                </article>
              ))}
            </div>
          ) : !error ? (
            <div className="dashboard-empty-state">
              <span className="empty-state-mark">G</span>
              <h3>No applications yet</h3>
              <p>When you apply through GovEase, the latest status will appear here.</p>
              <Link to="/opportunities" className="text-link">Explore opportunities <span aria-hidden="true">→</span></Link>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
