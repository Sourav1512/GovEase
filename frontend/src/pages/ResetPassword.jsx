import { Link } from 'react-router-dom';
import './Login.css';

export default function ResetPassword() {
  return (
    <main className="auth-container">
      <section className="auth-card compact-card">
        <h2>Password reset unavailable</h2>
        <p className="auth-subtitle">
          GovEase does not currently issue password-reset links. No password was changed.
        </p>
        <p className="auth-link"><Link to="/login">Return to login</Link></p>
      </section>
    </main>
  );
}
