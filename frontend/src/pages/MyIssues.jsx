import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import issueService from '../services/issueService';
import IssueList from '../components/issues/IssueList';
import Loader from '../components/common/Loader';

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    setLoading(true);
    try {
      const response = await issueService.getMyIssues();
      setIssues(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (issuesData) => {
    const stats = {
      total: issuesData.length,
      pending: issuesData.filter(i => i.status === 'pending').length,
      inProgress: issuesData.filter(i => i.status === 'in_progress').length,
      resolved: issuesData.filter(i => i.status === 'resolved').length,
      rejected: issuesData.filter(i => i.status === 'rejected').length
    };
    setStats(stats);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-civic-950 py-12 relative overflow-hidden">
      <div className="hero-glow w-[500px] h-[500px] bg-teal-glow/10 top-[-100px] left-[-100px] animate-pulse-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-glow/10 border border-teal-glow/20 text-teal-light text-xs font-semibold mb-4">
            👤 Personal Portal
          </div>
          <h1 className="text-4xl font-display font-bold text-white">My Reported Issues</h1>
          <p className="text-slate-400 mt-2">Track the status of issues you've reported</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="stat-card">
            <div className="text-3xl font-display font-bold text-white">{stats.total}</div>
            <div className="text-xs font-semibold text-teal-light mt-1 uppercase tracking-wider">Total Issues</div>
          </div>
          
          <div className="stat-card">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500/50" />
            <div className="text-3xl font-display font-bold text-white">{stats.pending}</div>
            <div className="text-xs font-semibold text-amber-light mt-1 uppercase tracking-wider">Pending</div>
          </div>
          
          <div className="stat-card">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/50" />
            <div className="text-3xl font-display font-bold text-white">{stats.inProgress}</div>
            <div className="text-xs font-semibold text-blue-light mt-1 uppercase tracking-wider">In Progress</div>
          </div>
          
          <div className="stat-card">
            <div className="absolute top-0 left-0 right-0 h-1 bg-green-500/50" />
            <div className="text-3xl font-display font-bold text-white">{stats.resolved}</div>
            <div className="text-xs font-semibold text-green-400 mt-1 uppercase tracking-wider">Resolved</div>
          </div>
          
          <div className="stat-card">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-500/50" />
            <div className="text-3xl font-display font-bold text-white">{stats.rejected}</div>
            <div className="text-xs font-semibold text-red-400 mt-1 uppercase tracking-wider">Rejected</div>
          </div>
        </div>

        {/* Issues List */}
        {issues.length === 0 ? (
          <div className="glass-strong rounded-3xl shadow-2xl p-12 text-center border border-white/10">
            <div className="text-6xl mb-6 animate-bounce">📭</div>
            <h3 className="text-2xl font-display font-bold text-white mb-3">No Issues Reported Yet</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">Start making a difference in your community by reporting your first issue!</p>
            <Link
              to="/report"
              className="btn-primary inline-flex py-3 px-8"
            >
              🚀 Report Your First Issue
            </Link>
          </div>
        ) : (
          <IssueList issues={issues} loading={false} />
        )}
      </div>
    </div>
  );
};

export default MyIssues;