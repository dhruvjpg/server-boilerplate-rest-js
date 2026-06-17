const Product = require('../../../schema/product.model');

const getProductById = async (id) => {
  return await Product.findById(id).populate('createdBy', 'name email');
};

module.exports = { getProductById };
