// import models
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const ProductReview = require('../../models/Review');

// controller to add a review
exports.addProductReview = async (req, res) => {
    try {
        // fetch data
        const {
            productId,
            userId,
            userName,
            rating,
            review,
        } = req.body;

        console.log(userName);

        // find the order
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed',
        });

        // if user have not bought the product
        if(!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it"
            });
        }

        // check if already reviewed
        const checkExistingReview = await ProductReview.findOne({productId, userId});

        if(checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product",
            });
        }

        // create new review
        const newReview = await ProductReview.create({
            productId,
            userId,
            userName,
            rating,
            review
        });

        // calculate average rating of product
        const reviews = await ProductReview.find({productId});

        const totalReviewsLength = review.totalReviewsLength;
        const averageReview = reviews.reduce((sum, review) => sum + review.reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId, {averageReview});

        res.status(200).json({
            success: true,
            message: "Review created successfully",
            data: newReview,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to fetch all reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        // fetch data
        const {id} = req.params;

        // fetch all reviews
        const reviews = await ProductReview.find({productId: id});

        return res.status(200).json({
            success: true,
            message: "Reviews fetched succesfully",
            data: reviews,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}