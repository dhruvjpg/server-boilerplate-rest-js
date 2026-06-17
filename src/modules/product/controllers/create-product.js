const { productService } = require('../services');
const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const product = await productService.createProduct(req.body, userId);

  return ApiResponse.created(res, product, 'Product created successfully');
});

module.exports = { createProduct };
