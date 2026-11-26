import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import issueService from '../services/issueService';
import Loader from '../components/common/Loader';
import { formatDate, getCategoryInfo, getStatusInfo } from '../utils/helpers';
import { ISSUE_CATEGORIES, ISSUE_STATUS } from '../utils/constants';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    setLoading(true);
    try {
      const response = await issueService.getAllIssues({ limit: 100 });
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

  const handleStatusUpdate = async (issueId) => {
    if (!newStatus) {
      alert('Please select a status');
      return;
    }

    setUpdating(true);
    try {
      await issueService.updateStatus(issueId, newStatus, remarks);
      alert('Status updated successfully!');
      setSelectedIssue(null);
      setNewStatus('');
      setRemarks('');
      fetchAllIssues();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-civic-950 py-12 relative overflow-hidden">
      <div className="hero-glow w-[500px] h-[500px] bg-teal-glow/10 top-[-100px] right-[-100px] animate-pulse-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-glow/10 border border-amber-glow/20 text-amber-light text-xs font-semibold mb-4">
            Government Portal
          </div>
          <h1 className="text-4xl font-display font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-2">Manage and resolve community issues</p>
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

        {/* Issues Table */}
        <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-white/10 bg-white/5">
            <h2 className="text-lg font-semibold text-white">All Issues</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {issues.map((issue) => {
                  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
                  const status = getStatusInfo(issue.status, ISSUE_STATUS);
                  
                  return (
                    <tr key={issue._id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <Link to={`/issues/${issue._id}`} className="text-teal-light hover:text-teal-glow font-medium transition">
                          {issue.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${category.color} bg-opacity-20 border border-current/20`}>
                          {category.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${status.color} bg-opacity-20 border border-current/20`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {issue.reportedBy?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {formatDate(issue.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedIssue(issue);
                            setNewStatus(issue.status);
                            setRemarks('');
                          }}
                          className="btn-amber px-3 py-1.5 text-xs"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Update Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-strong rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/10 animate-slide-in">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Update Issue Status</h3>
              
              <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-sm text-slate-300 mb-2 flex flex-col gap-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Issue</span>
                  <span className="font-semibold text-white">{selectedIssue.title}</span>
                </p>
                <p className="text-sm text-slate-300 flex flex-col gap-1 mt-3">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Current Status</span>
                  <span className="inline-block mt-1">
                    <span className="badge bg-white/10 text-white border border-white/20">
                      {getStatusInfo(selectedIssue.status, ISSUE_STATUS).label}
                    </span>
                  </span>
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="input-field appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1em]"
                  >
                    {ISSUE_STATUS.map((status) => (
                      <option key={status.value} value={status.value} className="bg-civic-900 text-white">
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows="3"
                    className="input-field resize-none"
                    placeholder="Add official comments about this status change..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedIssue._id)}
                  disabled={updating}
                  className="flex-1 btn-primary"
                >
                  {updating ? 'Updating...' : 'Confirm Update'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;