const Product = require('../../models/Product');

// controller to fetch filtered products
exports.getFilteredProducts = async (req, res) => {
    try {
        // fetch filters
        const {brand=[], category=[], sortBy='price-lowtohigh'} = req.query;

        // create filter query to search in db
        let filters = {};

        if(category.length) {
            filters.category = {$in: category.split(',')}
        }
        if(brand.length) {
            filters.brand = {$in: brand.split(',')};
        }

        // create sort by query to search in db
        let sort = {};

        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1;
                break;
            case 'price-hightolow':
                sort.price = -1;
                break;
            case 'title-atoz':
                sort.title = 1;
                break;
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                sort.price = 1;
        }

        // fetch filtered products
        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products,
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

// controller to get a product details
exports.getProductDetails = async (req, res) => {
    try {
        // fetch id
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        // search product in db
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

       // search related products of same category
       const relatedProducts = await Product.find({
            category: product.category,
            _id: {$ne: product._id}
        })
        .limit(4)
        .exec();

        // return success response
        res.status(200).json({
            success: true,
            message: 'Product details fetched successfully',
            data: {product, relatedProducts},
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