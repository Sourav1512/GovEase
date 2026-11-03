import { Link } from 'react-router-dom';
import './Login.css';

export default function ForgotPassword() {
  return (
    <main className="auth-container">
      <section className="auth-card compact-card">
        <h2>Password recovery</h2>
        <p className="auth-subtitle">
          Self-service password recovery is not available yet because this deployment has no reset-email service.
          Your password has not been changed.
        </p>
        <p className="auth-link"><Link to="/login">Return to login</Link></p>
      </section>
    </main>
  );
}
