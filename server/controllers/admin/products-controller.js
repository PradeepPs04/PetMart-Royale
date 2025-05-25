// importing models
const Product = require("../../models/Product");

// importing utility functions
const deleteFromCloudinary = require("../../utils/fileDelete");
const uploadFileToCloudinary = require("../../utils/fileUpload");

// controller to create new product
exports.createProduct = async (req, res) => {
    try {
        // fetch data
        const file = req.files?.file;
        const {title, description ,category, brand, price, salePrice, totalStock} = req.body;

        // validate data
        if( !file ||
            !title ||
            !description ||
            !category ||
            !brand ||
            !price ||
            !totalStock
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // upload image to cloudinary
        const uploadedImage = await uploadFileToCloudinary(file);

        // create product
        const createdProduct = await Product.create({
            image: uploadedImage.secure_url,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: createdProduct,
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


// controller to fetch all products
exports.fetchProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});

        return res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            data: allProducts,
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


// controller to edit a product
exports.editProduct = async (req, res) => {
    try {
        // fetch product id
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // fetch all data
        const file = req.files?.file;
        const {title, description ,category, brand, price, salePrice, totalStock} = req.body;

        // search product in db
        const productDetails = await Product.findById(id);

        if(!productDetails) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        let uploadedImage = null;
        // check if new image is uploaded
        if(file) {
            // delete preivous image
            await deleteFromCloudinary(productDetails.image, 'image');

            // upload new image
            uploadedImage = await uploadFileToCloudinary(file);
        }

        // update data in searched product
        productDetails.image = uploadedImage?.secure_url || productDetails.image;
        productDetails.title = title || productDetails.title;
        productDetails.description = description || productDetails.description;
        productDetails.category = category || productDetails.category;
        productDetails.brand = brand || productDetails.brand;
        productDetails.price = price || productDetails.price;
        productDetails.salePrice = salePrice;
        productDetails.totalStock = totalStock || productDetails.totalStock;

        // save updated products in db
        await productDetails.save();

        // return success response
        return res.status(200).json({
            success: true,
            message: "Product details updated successfully",
            data: productDetails,
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


// controller to delete a product
exports.deleteProduct = async (req, res) => {
    try {
        // fetch product id
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        // search and delete product 
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // delete image from cloudinary
        await deleteFromCloudinary(deletedProduct.image, 'image');

        // return success response
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct,
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


// controller to fetch top 10 selling products
exports.fetchTopSellingProducts = async (req, res) => {
    try {
        // search products & sort them in descending order according to quanitySold
        const topSellingProducts = await Product.find({})
            .sort({quantitySold: -1})
            .limit(10)
            .exec();

        // return success response
        return res.status(200).json({
            success: true,
            message: "Top 10 selling products fetched successfully",
            data: topSellingProducts,
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