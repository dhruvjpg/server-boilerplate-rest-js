const Product = require('../../../schema/product.model');
const productLogger = require('../product-logger');

const createProduct = async (productData, userId) => {
  const product = await Product.create({
    ...productData,
    createdBy: userId,
  });

  productLogger.info(`Product created: ${product.name}`, { productId: product._id, userId });

  return product;
};

module.exports = { createProduct };
