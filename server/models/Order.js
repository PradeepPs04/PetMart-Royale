const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            category: String,
            brand: String,
            image: String,
            price: String,
            quantity: Number,
        },
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    payerId: String,
    // for razorpay
    paymentId: String,
    orderId: String,
    signature: String,
});

module.exports = mongoose.model('Order', orderSchema);