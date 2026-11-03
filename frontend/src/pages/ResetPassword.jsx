import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess('Your password has been reset successfully.');
      setPassword('');
      setConfirmPassword('');
    } catch (submitError) {
      setError(submitError.message || 'Unable to reset your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card compact-card">
        <h2>Create new password</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength="8"
                placeholder="Minimum 8 characters"
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
        <p className="auth-link">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
