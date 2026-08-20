import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-950 flex" style={{ background: '#060b14' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(10,17,32,1) 0%, rgba(6,11,20,1) 100%)' }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(20,184,166,0.08)' }} />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(74,127,212,0.08)' }} />

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)' }}>
            <span className="text-xl">🏛️</span>
          </div>
          <span className="font-display text-xl font-bold text-white">CivicSpot</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl font-display font-extrabold text-white mb-5 leading-snug">
            Make your<br />community better.
          </h2>
          <p className="text-slate-500 leading-relaxed mb-10">
            Join thousands of citizens reporting and resolving local issues across India.
          </p>
          <div className="space-y-4">
            {['Report issues in 60 seconds', 'Track real-time resolution', 'Upvote what matters most'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)' }}>
                  <span className="text-teal-glow text-xs">✓</span>
                </div>
                <span className="text-slate-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 text-xs relative z-10">© 2025 CivicSpot. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'rgba(20,184,166,0.06)' }} />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)' }}>
                <span>🏛️</span>
              </div>
              <span className="font-display text-lg font-bold text-white">CivicSpot</span>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-white mb-2">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to continue to your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl flex items-start gap-3 animate-shake"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <span className="text-red-400 shrink-0">⚠️</span>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
              <input
                name="email" type="email" required
                value={formData.email} onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <input
                  name="password" type={showPassword ? 'text' : 'password'} required
                  value={formData.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field !pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all mt-2"
              style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 0 30px rgba(20,184,166,0.25)' }}
              onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 0 50px rgba(20,184,166,0.45)')}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(20,184,166,0.25)'}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-slate-600 text-xs">OR</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-teal-light font-semibold hover:text-teal-glow transition">
                Sign up free →
              </Link>
            </p>
            <Link to="/admin-login" className="block text-xs text-slate-600 hover:text-amber-light transition">
              🏛️ Government official? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;