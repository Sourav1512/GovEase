import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword) {
      return setError('Enter your current password.');
    }
    if (newPassword.length < 12) {
      return setError('New password must be at least 12 characters.');
    }
    if (newPassword === currentPassword) {
      return setError('New password must be different from the current password.');
    }
    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match');
    }
    if (newPassword.trim() !== newPassword) {
      return setError('Password cannot begin or end with spaces.');
    }
    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Password changed successfully. Opening the admin dashboard…');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || 'Password change failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Change Password</h2>
        <p style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>Choose a strong password that you have not used before.</p>
        {error && <div className="form-error" role="alert" style={{ marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="form-success" role="status" style={{ marginBottom: '1rem' }}>{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">Current password</label>
            <input id="currentPassword" className="form-input" type={showPasswords ? 'text' : 'password'} autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">New password</label>
            <input id="newPassword" className="form-input" type={showPasswords ? 'text' : 'password'} autoComplete="new-password" minLength={12} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm new password</label>
            <input id="confirmPassword" className="form-input" type={showPasswords ? 'text' : 'password'} autoComplete="new-password" minLength={12} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="button" className="btn btn-ghost btn-sm" aria-pressed={showPasswords} onClick={() => setShowPasswords((visible) => !visible)} style={{ marginBottom: '1rem' }}>
            {showPasswords ? 'Hide passwords' : 'Show passwords'}
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Saving...' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );
}
