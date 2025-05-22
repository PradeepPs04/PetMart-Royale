const express = require('express');
const router = express.Router();

// import controllers
const { getFilteredProducts, getProductDetails } = require('../../controllers/shop/products-controller');

// route to fetch filtered products
router.get('/get', getFilteredProducts);

// route to get a specific product details
router.get('/get/:id', getProductDetails);

module.exports = router;