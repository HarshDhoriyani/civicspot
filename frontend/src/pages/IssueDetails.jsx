import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import issueService from '../services/issueService';
import Loader from '../components/common/Loader';
import { formatDateTime, getTimeAgo, getCategoryInfo, getStatusInfo } from '../utils/helpers';
import { ISSUE_CATEGORIES, ISSUE_STATUS } from '../utils/constants';

const IssueDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const response = await issueService.getIssueById(id);
      setIssue(response.data);
    } catch (error) {
      console.error('Error fetching issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await issueService.upvoteIssue(id);
      fetchIssue();
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await issueService.addComment(id, commentText);
      setCommentText('');
      fetchIssue();
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Issue not found</h2>
          <button onClick={() => navigate('/issues')} className="mt-4 text-blue-600 hover:underline">
            Go back to issues
          </button>
        </div>
      </div>
    );
  }

  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
  const status = getStatusInfo(issue.status, ISSUE_STATUS);
  const isUpvoted = issue.upvotes?.includes(user?.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/issues')}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <span className="mr-2">←</span>
          Back to Issues
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Images */}
          {issue.images && issue.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {issue.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Issue image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {category.icon} {category.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{issue.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 {formatDateTime(issue.createdAt)}</span>
                  <span>👤 {issue.reportedBy?.name}</span>
                </div>
              </div>

              {/* Upvote Button */}
              <button
                onClick={handleUpvote}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition ${
                  isUpvoted
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                <span className="text-2xl">👍</span>
                <span className="font-bold">{issue.upvoteCount || 0}</span>
                <span className="text-xs">Upvotes</span>
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{issue.description}</p>
            </div>

            {/* Location */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">📍 Location</h2>
              <p className="text-gray-700">{issue.location.address}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                💬 Comments ({issue.comments?.length || 0})
              </h2>

              {/* Add Comment Form */}
              {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim() || submittingComment}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {issue.comments && issue.comments.length > 0 ? (
                  issue.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                        {comment.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{comment.user?.name}</span>
                          <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;