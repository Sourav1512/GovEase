import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const namePattern = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: '' }));
    if (error) setError('');
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Full name must be at least 2 characters.';
    } else if (!namePattern.test(formData.fullName.trim())) {
      nextErrors.fullName = 'Full name can only contain letters, spaces, apostrophes, hyphens, and periods.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please provide a valid email address.';
    }

    if (formData.phone && !/^[0-9+()\-\s]{10,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.password) {
      nextErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError('Please fix the highlighted fields and try again.');
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    setLoading(true);

    try {
      const response = await registerUser(payload);
      setSuccess('Registration successful. Redirecting...');
      navigate('/dashboard');
      return response;
    } catch (err) {
      const backendErrors = Array.isArray(err?.data?.errors) ? err.data.errors : [];
      const mappedErrors = {};
      backendErrors.forEach((item) => {
        const key = item.path || item.param || 'form';
        mappedErrors[key] = item.msg;
      });

      if (Object.keys(mappedErrors).length > 0) {
        setFieldErrors(mappedErrors);
      }

      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create GovEase AI Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              aria-invalid={!!fieldErrors.fullName}
            />
            {fieldErrors.fullName && <small className="field-error">{fieldErrors.fullName}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <small className="field-error">{fieldErrors.email}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              aria-invalid={!!fieldErrors.phone}
            />
            {fieldErrors.phone && <small className="field-error">{fieldErrors.phone}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
                placeholder="Minimum 8 characters"
                aria-invalid={!!fieldErrors.password}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((value) => !value)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldErrors.password && <small className="field-error">{fieldErrors.password}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-field">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
                aria-invalid={!!fieldErrors.confirmPassword}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldErrors.confirmPassword && <small className="field-error">{fieldErrors.confirmPassword}</small>}
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
