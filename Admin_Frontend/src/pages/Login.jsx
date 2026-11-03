import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Input({ id, label, type = 'text', value, onChange, autoComplete, error }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`form-input ${error ? 'error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const result = await login(email, password);
      navigate(result.passwordChangeRequired ? '/password-change' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>GovEase Admin Login</h2>
        {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-input-wrap">
              <input
                id="password"
                className="form-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-visibility-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
