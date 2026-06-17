const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, { user: req.user }, 'User profile retrieved successfully');
});

module.exports = { getMe };
