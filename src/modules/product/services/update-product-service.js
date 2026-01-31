const Product = require('../../../schema/product.model');
const productLogger = require('../product-logger');

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).populate('createdBy', 'name email');

  if (product) {
    productLogger.info(`Product updated: ${product.name}`, { productId: id });
  }

  return product;
};

module.exports = { updateProduct };
