const express = require('express');
const router = express.Router();

// import controllers
const { addProductReview, getProductReviews } = require('../../controllers/shop/product-review-controller');

// route to add a review
router.post('/add', addProductReview);

// route to get a specific product details
router.get('/get/:id', getProductReviews);

module.exports = router;