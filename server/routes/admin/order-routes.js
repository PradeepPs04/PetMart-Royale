const express = require('express');

// import controllers
const {getAllOrders, getOrderDetailsForAdmin, updateOrderStatus} = require('../../controllers/admin/order-controllers');

const router = express.Router();

// route to get all orders
router.get('/get', getAllOrders);

// route to get details of an order
router.get('/details/:id', getOrderDetailsForAdmin);

// route to update order status
router.put('/update/:id', updateOrderStatus);

module.exports = router;