import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 mt-auto overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(6,11,20,0) 0%, rgba(6,11,20,1) 100%)' }}>
      
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-teal-glow/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.25), rgba(20,184,166,0.1))', border: '1px solid rgba(20,184,166,0.3)' }}>
                <span className="font-display text-xl font-bold text-teal-light">C</span>
              </div>
              <span className="font-display text-xl font-bold text-white">CivicSpot</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Bridging the gap between citizens and government — one issue at a time. Built for communities that believe in collective action.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="mailto:harshdhoriyani2005@gmail.com" className="text-slate-500 hover:text-teal-light transition-colors">
                Email
              </a>
              <a href="tel:+917620821907" className="text-slate-500 hover:text-teal-light transition-colors">
                Call
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Browse Issues', to: '/issues' },
                { label: 'Report Issue', to: '/report' },
                { label: 'My Issues', to: '/my-issues' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-500 hover:text-teal-light text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Officials */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wider uppercase">For Officials</h4>
            <ul className="space-y-3">
              {[
                { label: 'Official Login', to: '/admin-login' },
                { label: 'Register as Official', to: '/admin-register' },
                { label: 'Admin Dashboard', to: '/admin' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-500 hover:text-amber-light text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-slate-600 text-xs">Email: harshdhoriyani2005@gmail.com</p>
                <p className="text-slate-600 text-xs mt-1">Phone: +91 7620821907</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-slate-600 text-sm">© 2025 CivicSpot. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-600 text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;