const { productService } = require('../services');
const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');
const { NotFoundError } = require('../../../utils/custom-error');

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return ApiResponse.noContent(res);
});

module.exports = { deleteProduct };
