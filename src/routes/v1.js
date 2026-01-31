const express = require('express');
const router = express.Router();

const authRoutes = require('../modules/auth/routes');
const productRoutes = require('../modules/product/routes');

// Mount module routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

module.exports = router;
