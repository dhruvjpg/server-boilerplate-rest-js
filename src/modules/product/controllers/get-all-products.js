const { productService } = require('../services');
const asyncHandler = require('../../../utils/async-handler');
const ApiResponse = require('../../../utils/response');

// @desc    Get all products with search, pagination, sort
// @route   GET /api/v1/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const { search, skip, limit, sort, category, status } = req.query;

  const result = await productService.getAllProducts({
    search,
    skip,
    limit,
    sort,
    category,
    status,
  });

  return ApiResponse.paginated(
    res,
    result.products,
    result.pagination,
    'Products retrieved successfully'
  );
});

module.exports = { getAllProducts };
