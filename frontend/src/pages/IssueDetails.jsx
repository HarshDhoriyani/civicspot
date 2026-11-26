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
      <div className="min-h-screen bg-civic-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-white">Issue not found</h2>
          <button onClick={() => navigate('/issues')} className="mt-4 text-teal-light hover:text-teal-glow transition-colors">
            ← Go back to issues
          </button>
        </div>
      </div>
    );
  }

  const category = getCategoryInfo(issue.category, ISSUE_CATEGORIES);
  const status = getStatusInfo(issue.status, ISSUE_STATUS);
  const isUpvoted = issue.upvotes?.includes(user?.id);

  return (
    <div className="min-h-screen bg-civic-950 py-12 relative overflow-hidden">
      <div className="hero-glow w-[600px] h-[600px] bg-teal-glow/10 top-[-200px] left-[-200px] animate-pulse-glow" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/issues')}
          className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <span className="mr-2">←</span>
          Back to Issues
        </button>

        {/* Main Card */}
        <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden border border-white/10">
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
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`badge ${category.color} bg-opacity-20 border border-current/20`}>
                    {category.label}
                  </span>
                  <span className={`badge ${status.color} bg-opacity-20 border border-current/20`}>
                    {status.label}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{issue.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>Reported {formatDateTime(issue.createdAt)}</span>
                  <span>By {issue.reportedBy?.name}</span>
                </div>
              </div>

              {/* Upvote Button */}
              <button
                onClick={handleUpvote}
                className={`flex flex-col items-center justify-center min-w-[90px] p-4 rounded-2xl border transition-all duration-300 ${
                  isUpvoted
                    ? 'border-teal-500/50 bg-teal-500/10 text-teal-light shadow-[0_0_15px_rgba(20,184,166,0.15)]'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 text-slate-300'
                }`}
              >
                <span className="text-sm font-semibold mb-1">Upvote</span>
                <span className="font-display font-bold text-xl">{issue.upvoteCount || 0}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Upvotes</span>
              </button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
              <p className="text-slate-300 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-5">{issue.description}</p>
            </div>

            {/* Location */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-white mb-3">Location</h2>
              <p className="text-slate-300 bg-white/5 border border-white/10 rounded-2xl p-5">{issue.location.address}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t border-white/10 pt-8 mt-8">
              <h2 className="text-xl font-display font-bold text-white mb-6">
                Discussion ({issue.comments?.length || 0})
              </h2>

              {/* Add Comment Form */}
              {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Join the discussion..."
                    className="input-field resize-none mb-3"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim() || submittingComment}
                    className="btn-primary"
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {issue.comments && issue.comments.length > 0 ? (
                  issue.comments.map((comment, index) => (
                    <div key={index} className="flex gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl transition-all duration-300 hover:bg-white/10">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-glow to-civic-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                        {comment.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-white">{comment.user?.name}</span>
                          <span className="text-xs text-slate-500">• {getTimeAgo(comment.createdAt)}</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-slate-400">No comments yet. Be the first to start the discussion!</p>
                  </div>
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