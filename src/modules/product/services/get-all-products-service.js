const Product = require('../../../schema/product.model');
const productLogger = require('../product-logger');

const getAllProducts = async (queryParams) => {
  const { search, skip = 0, limit = 10, sort = '-createdAt', category, status } = queryParams;

  productLogger.debug('Fetching products', { queryParams });

  // Build query
  const query = {};

  // Search in name and description
  if (search) {
    query.$text = { $search: search };
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter by status
  if (status) {
    query.status = status;
  }

  // Parse sort parameter (e.g., 'price' or '-price')
  const sortObj = {};
  if (sort) {
    const sortFields = sort.split(',');
    sortFields.forEach(field => {
      if (field.startsWith('-')) {
        sortObj[field.substring(1)] = -1;
      } else {
        sortObj[field] = 1;
      }
    });
  }

  // Execute query with pagination and sorting
  const products = await Product.find(query)
    .populate('createdBy', 'name email')
    .sort(sortObj)
    .skip(parseInt(skip))
    .limit(parseInt(limit));

  // Get total count for pagination
  const total = await Product.countDocuments(query);

  productLogger.info(`Retrieved ${products.length} products`);

  return {
    products,
    pagination: {
      total,
      skip: parseInt(skip),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit)),
    },
  };
};

module.exports = { getAllProducts };
