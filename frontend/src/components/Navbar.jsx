import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setMenuOpen(false);
    navigate('/');
  };

  const loggedInLinks = [
    { label: 'Overview', to: '/dashboard' },
    { label: 'Exams', to: '/exams' },
    { label: 'Opportunities', to: '/opportunities' },
    { label: 'Applications', to: '/applications' },
    { label: 'Profile', to: '/profile' },
  ];

  const publicLinks = [
    { label: 'Home', to: '/' },
    { label: 'Explore Exams', to: '/#explore' },
    { label: 'Government Jobs', to: '/#explore' },
    { label: 'Scholarships', to: '/#explore' },
    { label: 'Government Schemes', to: '/#explore' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'About Us', to: '/#about' },
  ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-inner">
        <div className="nav-brand">
          <Link to="/">GovEase AI</Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              {loggedInLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <span className="user-name">Hello, {user?.fullName || 'Citizen'}</span>
              <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
            </>
          ) : (
            <>
              {publicLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
