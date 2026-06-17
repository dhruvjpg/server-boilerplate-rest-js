const { productService } = require('../services');
const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');
const { NotFoundError } = require('../../../utils/custom-error');

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return ApiResponse.success(res, product, 'Product updated successfully');
});

module.exports = { updateProduct };
