const Product = require('../../models/Product');

exports.searchProducts = async (req, res) => {
    try {
        // fetch data
        const {keyword} = req.params;

        // validate data
        if(!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be in a string format",
            });
        }

        const regEx = new RegExp(keyword, 'i');

        const createSearchQuery = {
            $or: [
                {title: regEx},
                {description: regEx},
                {category: regEx},
                {brand: regEx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery);

        // return success response
        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: searchResults,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            err: err.message,
        });
    }
}   