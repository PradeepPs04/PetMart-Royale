const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    userName: String,
    rating: Number,
    review: String,
}, {timestamps: true});

module.exports = mongoose.model('ProductReview', productReviewSchema);