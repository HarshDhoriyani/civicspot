import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const STATS = [
  { value: '12,400+', label: 'Issues Reported', icon: '📋', color: '#14b8a6' },
  { value: '8,900+', label: 'Issues Resolved', icon: '✅', color: '#22c55e' },
  { value: '340+', label: 'Active Officials', icon: '🏛️', color: '#f59e0b' },
  { value: '52', label: 'Cities Covered', icon: '🌆', color: '#4a7fd4' },
];

const FEATURES = [
  {
    icon: '📸',
    title: 'Instant Reporting',
    desc: 'Snap a photo, pin the location, and report in under 60 seconds. No bureaucracy, no forms — just action.',
    gradient: 'from-teal-500/20 to-teal-500/5',
    border: 'border-teal-500/20',
    glow: 'rgba(20,184,166,0.15)',
  },
  {
    icon: '📡',
    title: 'Real-time Tracking',
    desc: 'Watch your issue move through the pipeline. Get notified at every stage as officials take action.',
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    icon: '🤝',
    title: 'Community Power',
    desc: 'Upvote issues that matter most. The community decides what gets fixed first through collective voice.',
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/20',
    glow: 'rgba(74,127,212,0.15)',
  },
  {
    icon: '⚡',
    title: 'Swift Resolution',
    desc: 'Government officials get a dedicated portal to manage, update and close issues with full audit trail.',
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Spot an Issue', desc: 'Notice something wrong in your neighborhood? Open CivicSpot and capture it.', icon: '👁️' },
  { step: '02', title: 'Report It', desc: 'Add details, upload photos, and drop a pin. Your report goes live instantly.', icon: '📤' },
  { step: '03', title: 'Upvote Together', desc: 'Your neighbors see the issue and upvote it to push it up the priority list.', icon: '👍' },
  { step: '04', title: 'Officials Act', desc: 'Government officials review high-priority issues and take action to fix them.', icon: '⚙️' },
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-civic-950 relative overflow-x-hidden">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-teal-glow/20 blur-[120px] pointer-events-none" />
        <div style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-glow/12 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-civic-800/30 blur-[150px] pointer-events-none" />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-teal-glow/30 bg-teal-glow/8 backdrop-blur-sm mb-10 animate-fade-up stagger-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-glow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-glow"></span>
            </span>
            <span className="text-teal-light text-sm font-semibold tracking-wide">Live Community Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white leading-[1.05] mb-7 animate-fade-up stagger-2">
            Your City.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 35%, #4a7fd4 70%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Your Voice.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up stagger-3">
            CivicSpot turns frustrated citizens into empowered change-makers.
            Report issues in your community, track real-time progress, and watch your neighborhood transform — together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-4">
            {isAuthenticated ? (
              <>
                <Link to="/report"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 0 40px rgba(20,184,166,0.35)' }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>📸</span> Report an Issue
                </Link>
                <Link to="/issues"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                >
                  Browse Issues →
                </Link>
              </>
            ) : (
              <>
                <Link to="/register"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 0 40px rgba(20,184,166,0.35)' }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Get Started — It's Free
                  <span className="text-white/70">→</span>
                </Link>
                <Link to="/issues"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all"
                >
                  View Live Issues
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm animate-fade-up stagger-5">
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Free to use</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> No download needed</span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Government verified</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────── */}
      <section className="relative py-20 border-y border-white/5" style={{ background: 'linear-gradient(180deg, rgba(10,17,32,0) 0%, rgba(10,17,32,0.8) 50%, rgba(10,17,32,0) 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon, color }) => (
              <div key={label} className="text-center group">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <div className="text-4xl md:text-5xl font-display font-extrabold mb-2" style={{ color }}>{value}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────── */}
      <section className="relative py-32">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-glow/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-teal-light font-semibold text-sm tracking-widest uppercase mb-4">Why CivicSpot</p>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-5">
              Built for real impact
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every feature is designed to close the gap between citizens and their local government.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(({ icon, title, desc, gradient, border, glow }) => (
              <div key={title}
                className={`relative p-8 rounded-3xl border ${border} bg-gradient-to-br ${gradient} backdrop-blur-sm group cursor-default transition-all duration-500 hover:scale-[1.02]`}
                style={{ boxShadow: `0 0 0 0 ${glow}`, transition: 'box-shadow 0.4s, transform 0.4s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px 0 ${glow}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${glow}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/8 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="relative py-32 border-t border-white/5">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-amber-glow/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-amber-light font-semibold text-sm tracking-widest uppercase mb-4">The Process</p>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-5">
              From report to resolved
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Four simple steps. Unlimited impact.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid md:grid-cols-4 gap-8">
              {HOW_IT_WORKS.map(({ step, title, desc, icon }, i) => (
                <div key={step} className="relative text-center group">
                  <div className="relative inline-flex">
                    <div className="w-24 h-24 rounded-3xl bg-civic-800 border border-white/10 flex flex-col items-center justify-center mx-auto mb-6 group-hover:border-teal-glow/30 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                      <span className="text-3xl mb-1">{icon}</span>
                    </div>
                    <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-teal-glow/20 border border-teal-glow/40 text-teal-light text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────── */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-[2rem] overflow-hidden p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(10,17,32,0.9) 50%, rgba(245,158,11,0.08) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 0 80px rgba(20,184,166,0.08), inset 0 1px 0 rgba(255,255,255,0.07)'
            }}
          >
            {/* Corner glows */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-teal-glow/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-glow/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm mb-8">
                🌟 Join thousands of change-makers
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 leading-tight">
                Ready to fix your city?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
                Sign up in 30 seconds and report your first issue today.
                Your neighbors are already making a difference.
              </p>
              {!isAuthenticated && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register"
                    className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-base text-white"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 0 50px rgba(20,184,166,0.4)' }}
                  >
                    Create Free Account →
                  </Link>
                  <Link to="/admin-login"
                    className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-base text-amber-light border border-amber-glow/30 bg-amber-glow/8 hover:bg-amber-glow/15 transition-all"
                  >
                    🏛️ Government Official?
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;