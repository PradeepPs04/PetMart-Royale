const express = require('express');

// import controllers
const { createOrder, verifyPayment, getAllOrdersByUser, getOrderDetails } = require('../../controllers/shop/order-controller');

const router = express.Router();

// route to create order for payment
router.post('/create', createOrder);

// route to verify payment
router.post('/verify', verifyPayment);

// route to get all orders of an user
router.get('/list/:userId', getAllOrdersByUser);

// route to get all orders of an user
router.get('/details/:id', getOrderDetails);

module.exports = router;