const { razorpayIstance } = require('../../config/razorpay');
const crypto = require('crypto');
require('dotenv').config();

// import models
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

// controller to create order for payment
exports.createOrder = async (req, res) => {
    try {
        // fetch data
        const {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
         } = req.body;

        // create razorpay order
        const options = {
            amount: totalAmount*100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        }
        const paymentResponse = await razorpayIstance.orders.create(options);

        // get orderId from response and save it in db
         // create order entry in db
        const createdOrder = await Order.create({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            orderId: paymentResponse.orderId,
            signature: paymentResponse.signature,
        });
        // createdOrder.orderId = paymentResponse.orderId;
        // createdOrder.signature = paymentResponse.signature;

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: {
                createdOrder,
                paymentResponse
            }
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

// controller to verify payment status
exports.verifyPayment = async (req, res) => {
    try {
        // fetch data
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            cartId,
            orderId,
        } = req.body;

        if(!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !cartId) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex');

        if(expectedSignature === razorpay_signature) {
            // remove cart
            await Cart.findByIdAndDelete(cartId);

            // update order details
            const order = await Order.findByIdAndUpdate(orderId, {
                paymentStatus: 'paid',
                orderStatus: 'confirmed',
            }, {new: true});

            // decreament quantity of product 
            for(let item of order.cartItems) {
                let product = await Product.findById(item.productId);
                if(!product) {
                    return res.status(404).json({
                        success: false,
                        message: `Not enough stock for this product ${product.title}`,
                    });
                }

                product.totalStock -= item.quantity;
                await product.save();
            }

            // return success response
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
            });
        } else {
            return res.status(200).json({
            success: false,
            message: "Payment failed",
            error: "Failed to verify signature"
        })
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get all orders of an user
exports.getAllOrdersByUser = async (req, res) => {
    try {
        // fetch data
        const {userId} = req.params;

        // find all orders in db
        const orders = await Order.find({userId});

        if(orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            mesage: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get details of an order
exports.getOrderDetails = async (req, res) => {
    try {
        // fetch data
        const {id} = req.params;

        // search order in db
        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Order details fetched successfully",
            data: order,
        })        
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            mesage: "Internal server error",
            error: err.message,
        });
    }
}