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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Reported Issues</h1>
          <p className="text-gray-600 mt-2">Track the status of issues you've reported</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500 mt-1">Total Issues</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg shadow p-6 text-center border-2 border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700">{stats.pending}</div>
            <div className="text-sm text-yellow-600 mt-1">Pending</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg shadow p-6 text-center border-2 border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{stats.inProgress}</div>
            <div className="text-sm text-blue-600 mt-1">In Progress</div>
          </div>
          
          <div className="bg-green-50 rounded-lg shadow p-6 text-center border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700">{stats.resolved}</div>
            <div className="text-sm text-green-600 mt-1">Resolved</div>
          </div>
          
          <div className="bg-red-50 rounded-lg shadow p-6 text-center border-2 border-red-200">
            <div className="text-3xl font-bold text-red-700">{stats.rejected}</div>
            <div className="text-sm text-red-600 mt-1">Rejected</div>
          </div>
        </div>

        {/* Issues List */}
        {issues.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Issues Reported Yet</h3>
            <p className="text-gray-500 mb-6">Start making a difference by reporting your first issue!</p>
            <Link
              to="/report"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Report Your First Issue
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