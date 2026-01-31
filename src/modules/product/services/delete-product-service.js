const Product = require('../../../schema/product.model');
const productLogger = require('../product-logger');

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (product) {
    productLogger.info(`Product deleted: ${product.name}`, { productId: id });
  }

  return product;
};

module.exports = { deleteProduct };
