import api from './api';

const issueService = {
  // Get all issues with filters
  getAllIssues: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await api.get(`/issues?${queryParams}`);
    return response.data;
  },

  // Get single issue
  getIssueById: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // Create new issue
  createIssue: async (formData) => {
    const response = await api.post('/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user's issues
  getMyIssues: async () => {
    const response = await api.get('/issues/user/my-issues');
    return response.data;
  },

  // Update issue
  updateIssue: async (id, data) => {
    const response = await api.put(`/issues/${id}`, data);
    return response.data;
  },

  // Delete issue
  deleteIssue: async (id) => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },

  // Add comment
  addComment: async (id, text) => {
    const response = await api.post(`/issues/${id}/comments`, { text });
    return response.data;
  },

  // Upvote issue
  upvoteIssue: async (id) => {
    const response = await api.post(`/issues/${id}/upvote`);
    return response.data;
  },

  // Update status (Admin)
  updateStatus: async (id, status, remarks) => {
    const response = await api.put(`/issues/${id}/status`, { status, remarks });
    return response.data;
  },
};

export default issueService;