import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessage('If an account exists for this email, a reset link will be sent shortly.');
    } catch (submitError) {
      setError(submitError.message || 'Unable to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card compact-card">
        <h2>Reset your password</h2>
        <p className="auth-subtitle">Enter the email associated with your GovEase account.</p>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        <p className="auth-link">
          Back to <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
