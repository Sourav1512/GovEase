import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { examsApi, opportunitiesApi } from '../api/examsApi';
import './HomePage.css';

const steps = [
  ['01', 'Create your account', 'Set up one secure account to manage your citizen-service journey.'],
  ['02', 'Build your profile', 'Add the information and documents requested by the opportunities you follow.'],
  ['03', 'Find an opportunity', 'Browse published exams, jobs, scholarships, and schemes.'],
  ['04', 'Apply and track', 'Use the available application forms and review submitted applications.'],
];

const faqs = [
  ['What can I find on GovEase?', 'Published government exams and opportunities, including jobs, scholarships, schemes, and related application information.'],
  ['Can I track my applications?', 'Sign in to view applications submitted through GovEase and their latest status.'],
  ['Is my profile reusable?', 'Your saved profile information can be used by supported application forms. Each form may request additional details.'],
  ['Where do opportunity details come from?', 'Listings are loaded from the platform database. Availability depends on what administrators have published.'],
];

const dateLabel = (value) => {
  if (!value) return 'Deadline not listed';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Deadline not listed' : `Apply by ${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
};

function HomePage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [exams, setExams] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([examsApi.list(), opportunitiesApi.list()])
      .then(([examResponse, opportunityResponse]) => {
        if (!active) return;
        if (!examResponse.success || !opportunityResponse.success) {
          setLoadError('Some listings are temporarily unavailable. Please open a service page to try again.');
          return;
        }
        setExams(examResponse.items || []);
        setOpportunities(opportunityResponse.items || []);
      })
      .catch(() => {
        if (active) setLoadError('Listings are temporarily unavailable. Please try again later.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const countType = (type) => opportunities.filter((item) => item.opportunityType?.toLowerCase() === type.toLowerCase()).length;
  const featured = opportunities.slice(0, 3);
  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    navigate(query ? `/opportunities?q=${encodeURIComponent(query)}` : '/opportunities');
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">One reliable place to plan your next step</span>
          <h1>Your gateway to government opportunities.</h1>
          <p>Discover published government exams, jobs, scholarships and welfare schemes. Manage supported applications through one clear, secure platform.</p>
          <div className="hero-actions">
            <Link to="/opportunities" className="primary-btn">Explore opportunities</Link>
            <Link to="/register" className="secondary-btn">Create your account</Link>
          </div>
          <form className="homepage-search" onSubmit={handleSearch} role="search">
            <label htmlFor="homepage-opportunity-search">Search published opportunities</label>
            <div>
              <input id="homepage-opportunity-search" type="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Job, scholarship, organisation…" />
              <button type="submit">Search</button>
            </div>
          </form>
          <ul className="trust-points">
            <li>One citizen profile</li>
            <li>Published listings</li>
            <li>Application status tracking</li>
          </ul>
        </div>
        <div className="hero-visual" aria-label="Explore government services">
          <div className="hero-editorial-panel">
            <span className="hero-panel-kicker">Your next step, made clearer</span>
            <p>Explore services with important details and application information together.</p>
            <div className="hero-panel-links">
              <Link to="/exams">Exams <span aria-hidden="true">↗</span></Link>
              <Link to="/opportunities?type=Job">Jobs <span aria-hidden="true">↗</span></Link>
              <Link to="/opportunities?type=Scholarship">Scholarships <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-label="Current published listings">
        {[
          { label: 'Published exams', value: exams.length },
          { label: 'Open opportunities', value: opportunities.length },
          { label: 'Scholarships', value: countType('Scholarship') },
          { label: 'Government jobs', value: countType('Job') },
        ].map((stat) => (
          <div className="stat-item" key={stat.label}>
            <strong>{loading ? '—' : stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {loadError && <p className="homepage-data-message" role="status">{loadError}</p>}

      <section id="explore" className="content-section">
        <div className="section-header">
          <span className="section-kicker">Explore services</span>
          <h2>Find the information relevant to your next move.</h2>
        </div>
        <div className="category-grid">
          {[
            ['Government exams', 'Review published exam notices, eligibility and important dates.', '/exams'],
            ['Government jobs', 'Browse job opportunities published by government and public-sector organisations.', '/opportunities?type=Job'],
            ['Scholarships', 'Find published scholarship opportunities and application information.', '/opportunities?type=Scholarship'],
            ['Government schemes', 'Explore available scheme listings and their requirements.', '/opportunities?type=Scheme'],
          ].map(([title, description, to]) => (
            <article className="feature-card" key={title}>
              <span className="feature-index">GovEase / Services</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={to}>Browse listings <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section neutral-section featured-section">
        <div className="section-header">
          <span className="section-kicker">Recently published</span>
          <h2>Opportunities from the live listings.</h2>
          <p>Details shown here are loaded from GovEase. Check each listing for current eligibility and deadlines.</p>
        </div>
        {loading ? (
          <div className="homepage-listing-state" role="status">Loading published opportunities…</div>
        ) : featured.length ? (
          <div className="card-grid">
            {featured.map((item) => (
              <article className="info-card" key={item._id}>
                <span className="scheme-tag">{item.opportunityType || 'Opportunity'}</span>
                <h3>{item.title}</h3>
                <p>{item.organization || 'Organization not listed'}</p>
                <div className="featured-meta">
                  <span>{dateLabel(item.applicationDeadline)}</span>
                  {item.location && <span>{item.location}</span>}
                </div>
                <Link to={`/opportunities/${item._id}`} className="card-link">View details <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="homepage-listing-state">
            <h3>No published opportunities yet</h3>
            <p>When new listings are published, they will appear here.</p>
            <Link to="/exams">Browse available exams</Link>
          </div>
        )}
        {featured.length > 0 && <div className="section-action"><Link to="/opportunities" className="text-link">View all opportunities <span aria-hidden="true">→</span></Link></div>}
      </section>

      <section id="how-it-works" className="content-section">
        <div className="section-header">
          <span className="section-kicker">How it works</span>
          <h2>A straightforward path from discovery to tracking.</h2>
        </div>
        <div className="steps-grid">
          {steps.map(([number, title, text]) => (
            <article className="step-card" key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="content-section neutral-section why-section">
        <div className="section-header">
          <span className="section-kicker">About GovEase</span>
          <h2>Public-service information, organised around citizens.</h2>
          <p>GovEase brings supported government opportunity listings, citizen profile tools and application tracking into one platform. Always refer to the official notice for authoritative requirements and deadlines.</p>
        </div>
        <div className="why-grid">
          <div className="benefit-list">
            {[
              'Browse several types of published opportunities in one place',
              'Keep profile information available for supported application forms',
              'Review submitted application statuses from your account',
              'Find the details and dates supplied with each listing',
            ].map((item) => <div key={item} className="benefit-item"><span className="checkmark" aria-hidden="true">✓</span><p>{item}</p></div>)}
          </div>
          <div className="about-note">
            <span>Important</span>
            <p>GovEase helps organise information; the official department notice remains the source of truth for eligibility, documents and deadlines.</p>
            <Link to="/opportunities">Explore current listings <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="content-section faq-section">
        <div className="section-header">
          <span className="section-kicker">Frequently asked questions</span>
          <h2>Useful details before you begin.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} className="faq-item" open={index === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <span className="section-kicker light">Start when you are ready</span>
          <h2>Explore opportunities and keep your applications organised.</h2>
        </div>
        <div className="cta-actions">
          <Link to="/register" className="primary-btn">Create your account</Link>
          <Link to="/login" className="secondary-btn light-btn">Login</Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>GovEase</strong>
          <p>Government opportunity information and application tools for citizens.</p>
        </div>
        <div className="footer-links">
          <div><h4>Services</h4><Link to="/exams">Exams</Link><Link to="/opportunities?type=Job">Government jobs</Link><Link to="/opportunities?type=Scholarship">Scholarships</Link><Link to="/opportunities?type=Scheme">Schemes</Link></div>
          <div><h4>Platform</h4><Link to="/#about">About</Link><Link to="/#how-it-works">How it works</Link><Link to="/login">Login</Link></div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
