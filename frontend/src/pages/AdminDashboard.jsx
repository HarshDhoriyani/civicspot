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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and resolve community issues</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-linear-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg p-6 text-center text-white">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm mt-1 opacity-90">Total Issues</div>
          </div>
          
          <div className="bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 text-center text-white">
            <div className="text-3xl font-bold">{stats.pending}</div>
            <div className="text-sm mt-1 opacity-90">Pending</div>
          </div>
          
          <div className="bg-linear-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-center text-white">
            <div className="text-3xl font-bold">{stats.inProgress}</div>
            <div className="text-sm mt-1 opacity-90">In Progress</div>
          </div>
          
          <div className="bg-linear-to-br from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-center text-white">
            <div className="text-3xl font-bold">{stats.resolved}</div>
            <div className="text-sm mt-1 opacity-90">Resolved</div>
          </div>
          
          <div className="bg-linear-to-br from-red-400 to-red-600 rounded-lg shadow-lg p-6 text-center text-white">
            <div className="text-3xl font-bold">{stats.rejected}</div>
            <div className="text-sm mt-1 opacity-90">Rejected</div>
          </div>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All Issues</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issues.map((issue) => {
                  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
                  const status = getStatusInfo(issue.status, ISSUE_STATUS);
                  
                  return (
                    <tr key={issue._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link to={`/issues/${issue._id}`} className="text-blue-600 hover:underline font-medium">
                          {issue.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${category.color} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                          {category.icon} {category.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {issue.reportedBy?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(issue.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedIssue(issue);
                            setNewStatus(issue.status);
                            setRemarks('');
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Update Issue Status</h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Issue:</strong> {selectedIssue.title}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Current Status:</strong> {selectedIssue.status}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {ISSUE_STATUS.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any comments about this status change..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedIssue._id)}
                  disabled={updating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update Status'}
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