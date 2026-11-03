import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await logoutUser();
    setMenuOpen(false);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    navigate('/', { replace: true });
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const loggedInLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Exams', to: '/exams' },
    { label: 'Opportunities', to: '/opportunities' },
    { label: 'Applications', to: '/applications' },
    { label: 'Profile', to: '/profile' },
  ];

  const publicLinks = [
    { label: 'Home', to: '/' },
    { label: 'Explore Exams', to: '/exams' },
    { label: 'Government Jobs', to: '/opportunities?type=Job' },
    { label: 'Scholarships', to: '/opportunities?type=Scholarship' },
    { label: 'Government Schemes', to: '/opportunities?type=Scheme' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'About Us', to: '/#about' },
  ];

  return (
    <nav ref={navRef} className="navbar" aria-label="Main navigation">
      <div className="nav-inner">
        <div className="nav-brand">
          <Link to="/" onClick={handleHomeClick}>GovEase AI</Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <>
              {loggedInLinks.map(({ label, to }) => (
                <Link key={label} to={to} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <span className="user-name">Hello, {user?.fullName || 'Citizen'}</span>
              <button type="button" onClick={handleLogout} className="nav-btn-logout">Logout</button>
            </>
          ) : (
            <>
              {publicLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="nav-link"
                  onClick={to === '/' ? handleHomeClick : () => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="nav-actions">
                <Link to="/login" className="nav-link login-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="nav-link btn-register" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
