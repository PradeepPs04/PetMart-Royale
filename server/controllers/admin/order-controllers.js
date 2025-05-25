// import models
const Order = require('../../models/Order');

// controller to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});

        return res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders,
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

// controller to get details of an order
exports.getOrderDetailsForAdmin = async (req, res) => {
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

// controller to update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        // fetch data
        const {id} = req.params;
        const {orderStatus} = req.body;

        // validate data
        if(!id || !orderStatus) {
            return res.status(400).json({
                success: false,
                message: "All fileds are required",
            });
        }

        // search & update order order
        const order =  await Order.findByIdAndUpdate(id, {orderStatus}, {new: true});

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            erro: err.message,
        });
    }
}