const { getAllProducts } = require('./get-all-products-service');
const { getProductById } = require('./get-product-by-id-service');
const { createProduct } = require('./create-product-service');
const { updateProduct } = require('./update-product-service');
const { deleteProduct } = require('./delete-product-service');

class ProductService {
  async getAllProducts(queryParams) {
    return await getAllProducts(queryParams);
  }

  async getProductById(id) {
    return await getProductById(id);
  }

  async createProduct(productData, userId) {
    return await createProduct(productData, userId);
  }

  async updateProduct(id, productData) {
    return await updateProduct(id, productData);
  }

  async deleteProduct(id) {
    return await deleteProduct(id);
  }
}

module.exports = { productService: new ProductService() };
