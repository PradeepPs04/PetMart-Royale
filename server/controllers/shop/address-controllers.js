const Address = require('../../models/Address');

// controller to create a new address
exports.addAddress = async (req, res) => {
    try {
        // fetch data
        const {userId, address, city, pincode, phone} = req.body;

        // validate data
        if(!userId || !address || !city || !pincode || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // create new address in db
        const createdAddress = await Address.create({
            userId, address, city, pincode, phone
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Address created successfully",
            data: createdAddress,
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

// controller to fetch all addresses
exports.fetchAllAddress = async (req, res) => {
    try {
        // fetch data
        const {userId} = req.params;

        // validate data
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // find address
        const addresses = await Address.find({userId});

        if(!addresses) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "All address fetched successfully",
            data: addresses,
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

// controller to edit an address
exports.editAddress = async (req, res) => {
    try {
        // fetch data
        const {userId, addressId} = req.params;
        const formData = req.body;

        // validate data
        if(!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        // search and update address
        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        }, formData, 
        {new:true});

        if(!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Address edited successfully",
            data: address,
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

// controller to delte an address
exports.deleteAddress = async (req, res) => {
    try {
        // fetch data
        const {userId, addressId} = req.params;

        // validate data
        if(!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            });
        }

        // serach and delete address
        const address = await Address.findOneAndDelete({_id: addressId,userId});

        if(!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
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