const Issue = require('../models/Issue');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
exports.createIssue = async (req, res) => {
  try {
    console.log('📝 Creating issue...');
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    console.log('User:', req.user.id);

    const { title, description, category, location } = req.body;

    // Validate required fields
    if (!title || !description || !category || !location) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (title, description, category, location)'
      });
    }

    // Parse location if it's a string
    let locationData;
    try {
      locationData = typeof location === 'string' ? JSON.parse(location) : location;
      console.log('📍 Location parsed:', locationData);
    } catch (error) {
      console.log('❌ Location parse error:', error);
      return res.status(400).json({
        success: false,
        message: 'Invalid location format'
      });
    }

    // Validate location structure
    if (!locationData.address || !locationData.coordinates || !locationData.coordinates.lat || !locationData.coordinates.lng) {
      console.log('❌ Invalid location structure');
      return res.status(400).json({
        success: false,
        message: 'Location must include address and coordinates (lat, lng)'
      });
    }

    // Handle uploaded images
    const images = req.files ? req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    })) : [];

    console.log('📸 Images:', images.length);

    // Create issue
    const issue = await Issue.create({
      title,
      description,
      category,
      location: locationData,
      images,
      reportedBy: req.user.id
    });

    console.log('✅ Issue created:', issue._id);

    // Populate user details
    await issue.populate('reportedBy', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      data: issue
    });
  } catch (error) {
    console.error('❌ Error creating issue:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating issue',
      error: error.message
    });
  }
};

// @desc    Get all issues with filters
// @route   GET /api/issues
// @access  Public
exports.getAllIssues = async (req, res) => {
  try {
    const { 
      category, 
      status, 
      priority,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const issues = await Issue.find(query)
      .populate('reportedBy', 'name email avatar')
      .populate('assignedTo', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Issue.countDocuments(query);

    res.status(200).json({
      success: true,
      count: issues.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: issues
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching issues',
      error: error.message
    });
  }
};

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Public
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name email phone avatar')
      .populate('assignedTo', 'name email')
      .populate('comments.user', 'name avatar');

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching issue',
      error: error.message
    });
  }
};

// @desc    Update issue (by owner or admin)
// @route   PUT /api/issues/:id
// @access  Private
exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check ownership or admin
    if (issue.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this issue'
      });
    }

    const { title, description, category, location } = req.body;

    if (title) issue.title = title;
    if (description) issue.description = description;
    if (category) issue.category = category;
    if (location) issue.location = typeof location === 'string' ? JSON.parse(location) : location;

    await issue.save();

    res.status(200).json({
      success: true,
      message: 'Issue updated successfully',
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating issue',
      error: error.message
    });
  }
};

// @desc    Update issue status (Admin only)
// @route   PUT /api/issues/:id/status
// @access  Private/Admin
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Update status
    issue.status = status;
    
    // Add to status history
    issue.statusHistory.push({
      status,
      changedBy: req.user.id,
      remarks
    });

    // If resolved, set resolvedAt
    if (status === 'resolved') {
      issue.resolvedAt = Date.now();
    }

    await issue.save();

    res.status(200).json({
      success: true,
      message: 'Issue status updated successfully',
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check ownership or admin
    if (issue.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this issue'
      });
    }

    // Delete images from cloudinary
    for (const image of issue.images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // Soft delete
    issue.isActive = false;
    await issue.save();

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting issue',
      error: error.message
    });
  }
};

// @desc    Add comment to issue
// @route   POST /api/issues/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Comment text is required'
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    issue.comments.push({
      user: req.user.id,
      text
    });

    await issue.save();
    await issue.populate('comments.user', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: issue.comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
exports.upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if already upvoted
    const alreadyUpvoted = issue.upvotes.includes(req.user.id);

    if (alreadyUpvoted) {
      // Remove upvote
      issue.upvotes = issue.upvotes.filter(id => id.toString() !== req.user.id);
    } else {
      // Add upvote
      issue.upvotes.push(req.user.id);
    }

    await issue.save();

    res.status(200).json({
      success: true,
      message: alreadyUpvoted ? 'Upvote removed' : 'Issue upvoted',
      data: {
        upvoteCount: issue.upvoteCount,
        isUpvoted: !alreadyUpvoted
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error upvoting issue',
      error: error.message
    });
  }
};

// @desc    Get user's reported issues
// @route   GET /api/issues/my-issues
// @access  Private
exports.getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ 
      reportedBy: req.user.id,
      isActive: true 
    })
    .sort('-createdAt')
    .populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching your issues',
      error: error.message
    });
  }
};