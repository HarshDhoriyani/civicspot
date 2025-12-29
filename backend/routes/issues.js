const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { uploadMultiple, handleUploadError } = require('../middleware/upload');
const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  updateIssueStatus,
  deleteIssue,
  addComment,
  upvoteIssue,
  getMyIssues
} = require('../controllers/issueController');

// IMPORTANT: Specific routes BEFORE parameterized routes
router.get('/user/my-issues', protect, getMyIssues);

// Public routes
router.get('/', getAllIssues);

// Protected routes
router.post('/', protect, uploadMultiple, handleUploadError, createIssue);

// Routes with :id parameter (must come after specific routes)
router.get('/:id', getIssueById);
router.put('/:id', protect, updateIssue);
router.delete('/:id', protect, deleteIssue);
router.post('/:id/comments', protect, addComment);
router.post('/:id/upvote', protect, upvoteIssue);

// Admin only routes
router.put('/:id/status', protect, admin, updateIssueStatus);

module.exports = router;