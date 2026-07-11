import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone } from '../utils/helpers';

const DEPARTMENTS = [
  'Municipal Corporation',
  'Public Works Department',
  'Electricity Board',
  'Water Supply Board',
  'Sanitation Department',
  'Roads & Transport',
  'Urban Development',
  'Other',
];

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    officialId: '',
    adminAccessCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (!formData.department) {
      setError('Please select your department');
      return;
    }
    if (!formData.officialId.trim()) {
      setError('Official ID is required');
      return;
    }
    if (!formData.adminAccessCode.trim()) {
      setError('Government access code is required');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      await registerAdmin(registerData);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-civic-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="hero-glow w-96 h-96 bg-teal-glow/10 top-0 right-1/4 animate-pulse-glow" />
      <div className="hero-glow w-80 h-80 bg-amber-glow/8 bottom-0 left-1/4 animate-pulse-glow" />

      <div className="max-w-lg w-full relative z-10">
        <div className="glass-strong rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-glow/10 border border-teal-glow/20 mb-5">
              <span className="text-3xl">🏛️</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-glow/10 border border-teal-glow/20 text-teal-light text-xs font-semibold mb-4">
              Official Registration
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Register as Official
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Create your government account to manage community issues
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-shake">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input name="name" type="text" required value={formData.name} onChange={handleChange} className="input-field" placeholder="Dr. Rajesh Kumar" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Official Email</label>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} className="input-field" placeholder="official@gov.in" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                <input name="phone" type="tel" required maxLength="10" value={formData.phone} onChange={handleChange} className="input-field" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                <select name="department" required value={formData.department} onChange={handleChange} className="input-field">
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Official ID</label>
                <input name="officialId" type="text" required value={formData.officialId} onChange={handleChange} className="input-field" placeholder="GOV-2024-001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input name="password" type="password" required value={formData.password} onChange={handleChange} className="input-field" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="input-field" placeholder="••••••••" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Government Access Code
                </label>
                <input name="adminAccessCode" type="password" required value={formData.adminAccessCode} onChange={handleChange} className="input-field" placeholder="Provided by your department" />
                <p className="mt-1.5 text-xs text-slate-500">Contact your department head for the access code</p>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
              {loading ? 'Creating account...' : 'Register Official Account →'}
            </button>
          </form>

          <div className="divider-gradient" />

          <div className="text-center space-y-3">
            <p className="text-sm text-slate-500">
              Already registered?{' '}
              <Link to="/admin-login" className="text-teal-light hover:text-teal-glow font-semibold transition">
                Sign in
              </Link>
            </p>
            <Link to="/register" className="inline-block text-xs text-slate-600 hover:text-slate-400 transition">
              ← Citizen registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
