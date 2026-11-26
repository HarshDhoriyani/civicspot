import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone } from '../utils/helpers';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || formData.name.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 2, label: 'Medium', color: 'bg-amber-500' };
    return { strength: 3, label: 'Strong', color: 'bg-teal-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-civic-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden noise-overlay">
      {/* Background Glows */}
      <div className="hero-glow w-[500px] h-[500px] bg-teal-glow/15 top-[-100px] left-[-100px] animate-pulse-glow" />
      <div className="hero-glow w-[400px] h-[400px] bg-amber-glow/10 bottom-[-100px] right-[-100px] animate-float" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-10 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 animate-fade-up">
        <div className="glass-strong rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-glow/50 to-transparent" />

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-teal-glow/10 border border-teal-glow/20 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.15)]">
                <span className="font-display text-3xl font-bold text-teal-light">C</span>
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-white">
              Join CivicSpot
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Create your account and start making a difference
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3 animate-shake">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="9876543210"
                  maxLength="10"
                />
              </div>
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 w-12">
                      {passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field !pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-xs text-red-400">Passwords don't match</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-base shadow-[0_0_30px_rgba(20,184,166,0.25)] hover:shadow-[0_0_50px_rgba(20,184,166,0.4)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-civic-900 text-slate-500 rounded-full border border-white/10">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-semibold text-teal-light hover:text-teal-glow transition group"
            >
              Sign in instead
              <span className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;