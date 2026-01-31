const express = require('express');
const router = express.Router();

const { getAllProducts } = require('./controllers/get-all-products');
const { getProductById } = require('./controllers/get-product-by-id');
const { createProduct } = require('./controllers/create-product');
const { updateProduct } = require('./controllers/update-product');
const { deleteProduct } = require('./controllers/delete-product');
const authenticate = require('../../middlewares/authenticate');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;
