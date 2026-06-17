const { productService } = require('../services');
const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');
const { NotFoundError } = require('../../../utils/custom-error');

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return ApiResponse.success(res, product, 'Product retrieved successfully');
});

module.exports = { getProductById };
