import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
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
      const response = await login(formData);
      if (response.data.user.role !== 'admin') {
        setError('This portal is for government officials only. Please use the citizen login.');
        return;
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="hero-glow w-96 h-96 bg-amber-glow/10 top-0 left-1/4 animate-pulse-glow" />
      <div className="hero-glow w-80 h-80 bg-teal-glow/10 bottom-0 right-1/4 animate-pulse-glow" />

      <div className="max-w-md w-full relative z-10">
        <div className="glass-strong rounded-3xl p-8 space-y-8 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-glow/10 border border-amber-glow/20 mb-5">
              <span className="font-display text-3xl font-bold text-amber-light">C</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-glow/10 border border-amber-glow/20 text-amber-light text-xs font-semibold mb-4">
              Government Portal
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Official Sign In
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Access the CivicSpot administration dashboard
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-shake">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Official Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="official@gov.in"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field !pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-amber w-full py-3.5">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Access Dashboard →'
              )}
            </button>
          </form>

          <div className="divider-gradient" />

          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500">
              New government official?{' '}
              <Link to="/admin-register" className="text-amber-light hover:text-amber-glow font-semibold transition">
                Register here
              </Link>
            </p>
            <Link to="/login" className="inline-block text-xs text-slate-600 hover:text-slate-400 transition">
              ← Citizen login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
