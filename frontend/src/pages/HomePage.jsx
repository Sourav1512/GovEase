import { Link } from 'react-router-dom';
import './HomePage.css';

const stats = [
  { label: 'Citizens helped', value: '8.4L+' },
  { label: 'Exams tracked', value: '320+' },
  { label: 'Scholarships matched', value: '140+' },
  { label: 'Jobs monitored', value: '260+' },
];

const opportunityCategories = [
  {
    title: 'Explore Exams',
    description: 'Track upcoming competitive exams, eligibility criteria, and important dates in one place.',
    badge: 'Popular',
  },
  {
    title: 'Government Jobs',
    description: 'Browse role summaries, application windows, and requirements for public sector careers.',
    badge: 'Fresh',
  },
  {
    title: 'Scholarships & Schemes',
    description: 'Discover financial aid and welfare programs that match your profile and background.',
    badge: 'Updated',
  },
];

const examCards = [
  { name: 'SSC CGL', stage: 'Tier I', date: '12 Oct 2026', status: 'Application open' },
  { name: 'UPSC CSE', stage: 'Prelims', date: '18 Nov 2026', status: 'Registration live' },
  { name: 'IBPS PO', stage: 'Prelims', date: '02 Dec 2026', status: 'New notice' },
  { name: 'RRB NTPC', stage: 'Computer-Based', date: '24 Dec 2026', status: 'Admit card soon' },
];

const jobCards = [
  { title: 'Junior Secretariat Assistant', org: 'Ministry of Home Affairs', type: 'Central Government', deadline: 'Apply by 10 Oct' },
  { title: 'State Audit Officer', org: 'State Public Service Commission', type: 'State Government', deadline: 'Apply by 18 Oct' },
  { title: 'Technical Officer', org: 'Public Sector Undertaking', type: 'PSU', deadline: 'Apply by 24 Oct' },
];

const schemeCards = [
  { title: 'Post-Matric Scholarship', category: 'Education Support', label: 'For eligible students' },
  { title: 'Skill Development Assistance', category: 'Career Growth', label: 'Training-linked support' },
  { title: 'Women Empowerment Scheme', category: 'Social Welfare', label: 'Support under priority category' },
];

const steps = [
  { title: 'Create your profile', text: 'Add your education, experience, categories, and documents once for faster applications.' },
  { title: 'Discover matches', text: 'Get curated exam, job, and scheme suggestions based on your profile and preferences.' },
  { title: 'Apply with confidence', text: 'Fill secure form-based applications with auto-filled details and document tracking.' },
  { title: 'Track progress', text: 'Monitor deadlines, statuses, document checks, and updates from one dashboard.' },
];

const reasons = [
  'Single portal for exams, jobs, scholarships, and schemes',
  'Dynamic application support with reusable profile data',
  'Clear timeline and application status tracking',
  'Designed for trust, clarity, and accessibility',
];

const faqs = [
  {
    question: 'Is GovEase AI only for citizens?',
    answer: 'GovEase AI supports citizens with a user portal and a dedicated admin workspace for managing opportunities, forms, and platform workflows.',
  },
  {
    question: 'Can I reuse my profile across forms?',
    answer: 'Yes. The platform stores your education, work history, certifications, and personal details so you can apply faster without re-entering information.',
  },
  {
    question: 'Do I need to maintain multiple accounts?',
    answer: 'No. One profile can help you track exams, central and state jobs, scholarships, and scheme applications from a single dashboard.',
  },
  {
    question: 'How does the application tracking work?',
    answer: 'Each application moves through stages such as applied, under review, approved, or rejected, with activity updates visible in the citizen dashboard.',
  },
];

function HomePage() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Trusted government opportunity platform</span>
          <h1>Your Gateway to Government Opportunities.</h1>
          <p>
            Discover government exams, job opportunities, scholarships and welfare schemes.
            Manage your applications and complete forms through one simple platform.
          </p>
          <div className="hero-actions">
            <a href="#explore" className="primary-btn">Explore Opportunities</a>
            <Link to="/register" className="secondary-btn">Create Your Account</Link>
          </div>
          <ul className="trust-points">
            <li>Secure profile management</li>
            <li>Opportunity tracking</li>
            <li>Application guidance</li>
          </ul>
        </div>

        <div className="hero-visual" aria-label="GovEase dashboard preview">
          <div className="preview-window">
            <div className="preview-header">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="preview-body">
              <aside className="sidebar-mini">
                <span className="mini-pill active">Overview</span>
                <span className="mini-pill">Exams</span>
                <span className="mini-pill">Jobs</span>
                <span className="mini-pill">Schemes</span>
              </aside>
              <div className="preview-content">
                <div className="mini-card highlight-card">
                  <p>Profile completion</p>
                  <strong>82%</strong>
                </div>
                <div className="mini-grid">
                  <div className="mini-card">
                    <small>Applied</small>
                    <strong>07</strong>
                  </div>
                  <div className="mini-card">
                    <small>Under review</small>
                    <strong>03</strong>
                  </div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-row">
                    <span className="timeline-dot success" />
                    <div>
                      <strong>SSC CGL</strong>
                      <small>Application submitted</small>
                    </div>
                  </div>
                  <div className="timeline-row">
                    <span className="timeline-dot warning" />
                    <div>
                      <strong>IBPS PO</strong>
                      <small>Document check pending</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        {stats.map(({ label, value }) => (
          <div className="stat-item" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section id="explore" className="content-section">
        <div className="section-header">
          <span className="section-kicker">Explore government opportunities</span>
          <h2>Everything in one place, tailored for your next step.</h2>
        </div>
        <div className="category-grid">
          {opportunityCategories.map(({ title, description, badge }) => (
            <article className="feature-card" key={title}>
              <span className="feature-badge">{badge}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to="/login">View details</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section neutral-section">
        <div className="section-header">
          <span className="section-kicker">Latest government exams</span>
          <h2>Stay informed about key exam timelines.</h2>
        </div>
        <div className="card-grid">
          {examCards.map(({ name, stage, date, status }) => (
            <article className="info-card" key={name}>
              <div className="card-topline">
                <span>{stage}</span>
                <span className="status-pill">{status}</span>
              </div>
              <h3>{name}</h3>
              <p>{date}</p>
              <button type="button" className="card-link">Know more</button>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <span className="section-kicker">Government jobs</span>
          <h2>Track roles from central, state, and public sector hiring.</h2>
        </div>
        <div className="card-grid compact-grid">
          {jobCards.map(({ title, org, type, deadline }) => (
            <article className="job-card" key={title}>
              <small>{type}</small>
              <h3>{title}</h3>
              <p>{org}</p>
              <div className="meta-row">
                <span>{deadline}</span>
                <button type="button">View role</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section neutral-section">
        <div className="section-header">
          <span className="section-kicker">Scholarships and schemes</span>
          <h2>Discover support opportunities built around your profile.</h2>
        </div>
        <div className="card-grid">
          {schemeCards.map(({ title, category, label }) => (
            <article className="info-card" key={title}>
              <span className="scheme-tag">{category}</span>
              <h3>{title}</h3>
              <p>{label}</p>
              <button type="button" className="card-link">Check eligibility</button>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="content-section">
        <div className="section-header">
          <span className="section-kicker">How GovEase works</span>
          <h2>From discovery to application in four simple steps.</h2>
        </div>
        <div className="steps-grid">
          {steps.map(({ title, text }, index) => (
            <article className="step-card" key={title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="content-section neutral-section why-section">
        <div className="section-header">
          <span className="section-kicker">Why choose GovEase</span>
          <h2>Built for clarity, accessibility, and smarter decisions.</h2>
        </div>
        <div className="why-grid">
          <div className="benefit-list">
            {reasons.map((item) => (
              <div key={item} className="benefit-item">
                <span className="checkmark">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="micro-panel">
            <div className="micro-box">
              <small>Saved search</small>
              <strong>Junior officer roles</strong>
            </div>
            <div className="micro-box">
              <small>Upcoming deadline</small>
              <strong>12 days left</strong>
            </div>
            <div className="micro-box success-box">
              <small>Application status</small>
              <strong>Under review</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section application-preview">
        <div className="section-header left-aligned">
          <span className="section-kicker">Application management</span>
          <h2>Keep track of every opportunity without losing the thread.</h2>
        </div>
        <div className="management-dashboard">
          <div className="management-summary">
            <div className="summary-box">
              <span>Total applications</span>
              <strong>14</strong>
            </div>
            <div className="summary-box">
              <span>Under review</span>
              <strong>04</strong>
            </div>
            <div className="summary-box success">
              <span>Approved</span>
              <strong>03</strong>
            </div>
          </div>
          <div className="application-list">
            <div className="application-row">
              <div>
                <strong>SSC CGL 2026</strong>
                <small>Submitted 2 days ago</small>
              </div>
              <span className="badge neutral">Applied</span>
            </div>
            <div className="application-row">
              <div>
                <strong>UPSC CSE</strong>
                <small>Document verification pending</small>
              </div>
              <span className="badge warning">Under review</span>
            </div>
            <div className="application-row">
              <div>
                <strong>Post-Matric Scholarship</strong>
                <small>Approved by nodal office</small>
              </div>
              <span className="badge success">Approved</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section faq-section">
        <div className="section-header">
          <span className="section-kicker">Frequently asked questions</span>
          <h2>Questions citizens ask before they start.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="faq-item" open={question === faqs[0].question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <span className="section-kicker light">Ready to begin?</span>
          <h2>Build your profile and take the next step with confidence.</h2>
        </div>
        <div className="cta-actions">
          <Link to="/register" className="primary-btn">Create Your Account</Link>
          <Link to="/login" className="secondary-btn light-btn">Login</Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <strong>GovEase AI</strong>
          <p>Helping citizens discover and manage government opportunities with clarity.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Platform</h4>
            <a href="#explore">Exams</a>
            <a href="#explore">Jobs</a>
            <a href="#explore">Scholarships</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#how-it-works">How it works</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
