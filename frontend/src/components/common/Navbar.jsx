import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/issues', label: 'Issues' },
    ...(isAuthenticated ? [
      { to: '/report', label: 'Report' },
      { to: '/my-issues', label: 'My Issues' },
    ] : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Dashboard', isAdmin: true }] : []),
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(6, 11, 20, 0.92)'
          : 'rgba(6, 11, 20, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.3), rgba(20,184,166,0.1))',
                border: '1px solid rgba(20,184,166,0.3)',
                boxShadow: '0 0 20px rgba(20,184,166,0.15)'
              }}
            >
              <span className="font-display text-lg font-bold text-teal-light">C</span>
            </div>
            <div>
              <span className="font-display text-lg font-bold text-white tracking-tight">CivicSpot</span>
              <span className="hidden sm:block text-[10px] text-slate-600 tracking-wider uppercase -mt-0.5">Community Platform</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(to) ? '#2dd4bf' : 'rgba(148,163,184,1)',
                  background: isActive(to) ? 'rgba(20,184,166,0.08)' : 'transparent',
                }}
                onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.color = 'rgba(148,163,184,1)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-glow" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #4a7fd4)' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="leading-none">
                    <p className="text-sm font-semibold text-white">{user?.name?.split(' ')[0]}</p>
                    {isAdmin && <p className="text-[10px] text-amber-light mt-0.5">Official</p>}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 transition-all hover:text-red-300"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 0 20px rgba(20,184,166,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(20,184,166,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(20,184,166,0.25)'}
                >
                  Get Started
                </Link>
                <Link to="/admin-login"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-light transition-all ml-1"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
                >
                  Official
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white transition-all"
            style={{ background: mobileOpen ? 'rgba(255,255,255,0.08)' : 'transparent', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5"
          style={{ background: 'rgba(6,11,20,0.97)', backdropFilter: 'blur(24px)' }}>
          <div className="px-5 py-5 space-y-1.5">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive(to) ? '#2dd4bf' : 'rgba(148,163,184,1)',
                  background: isActive(to) ? 'rgba(20,184,166,0.08)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <div className="h-px my-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            {isAuthenticated ? (
              <button onClick={handleLogout}
                className="w-full py-3 rounded-xl text-sm font-semibold text-red-400"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                Sign Out
              </button>
            ) : (
              <div className="space-y-2 pt-1">
                <Link to="/login" className="block text-center py-3 rounded-xl text-sm font-medium text-slate-300"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Login
                </Link>
                <Link to="/register" className="block text-center py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}>
                  Get Started
                </Link>
                <Link to="/admin-login" className="block text-center py-3 rounded-xl text-sm font-semibold text-amber-light"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  Official Portal
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
