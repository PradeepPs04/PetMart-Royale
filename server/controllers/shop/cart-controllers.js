// import models
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');


// controller to add an item to cart
exports.addToCart = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;
        const {productId, quantity} = req.body;

        // validate data
        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // search product in db
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // find the cart
        let cart = await Cart.findOne({userId});

        // if no cart present then create one
        if(!cart) {
            cart = new Cart({userId, items:[]});
        }

        // check if product is already added or not
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrentProductIndex === -1) {
            cart.items.push({productId, quantity});
        } else {
            // increase quantity of product
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        // save cart in db
        await cart.save();

        // return success response
        res.status(200).json({
            success: true,
            message: 'Product is added to cart',
            data: cart,
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to get all cart items
exports.fetchCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: 'User id is required',
            });
        }

        // find the cart
        const cart = await Cart.findOne({userId})
            .populate({
                path: 'items.productId',
                select: 'image title price salePrice', // these fields will be selected after populating
            })
            .exec();

        if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }
        

        // validate cart items
        const validItems = cart.items.filter((productItem) => productItem.productId); // productId will be populated if not deleted
        
        // if cart contains any items that has been removed by admin then remove it
        if(validItems.length < cart.items.length) {
            cart.items = validItems;
            // save updated cart in db
            await cart.save();
        }

        // create data of cart items
        const popoulateCartItmes = validItems.map((item) => {
            return {
              productId: item.productId._id,
              image: item.productId.image,
              title: item.productId.title,
              price: item.productId.price,
              salePrice: item.productId.salePrice,
              quantity: item.quantity,
            }
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: {
                ...cart._doc,
                items: popoulateCartItmes,
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to update quantity of an item
exports.updateCartItemQuantity = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;
        const {productId, quantity} = req.body;

        // validate data
        if(!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find cart
        const cart = await Cart.findOne({userId});

        // if cart not found
        if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // find index of product in cart
        const findCurrentProductIndex = cart.items?.findIndex((item) => item.productId.toString() === productId);

        // check if the product is not present
        if(findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        // update the quanity
        cart.items[findCurrentProductIndex].quantity = quantity;

        // save updated cart in db
        await cart.save();

        // populate the cart
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        // create data of valid cart items
        const popoulateCartItmes = cart.items.map((item) => {
            return {
              productId: item.productId ? item.productId._id : null,
              image: item.productId ? item.productId.image : null,
              title: item.productId ? item.productId.title : null,
              price: item.productId ? item.productId.price : null,
              salePrice: item.productId ? item.productId.salePrice : null,
              quantity: item.quantity,
            }
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Item updated successfully",
            data: {
                ...cart._doc,
                items: popoulateCartItmes,
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to delete an item from cart
exports.deleteCartItem = async (req, res) => {
    try {
        // fetch data
        const userId = req.user.id;
        const {productId} = req.params;

        if(!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required", 
            });
        }

        // remove product from cart
        const cart = await Cart.findOneAndUpdate(
            {userId},
            {
                $pull: {
                    items: {productId: productId},
                },
            },
            {new: true},
        );
        
        // check if cart was not found
        if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        // populate cart 
        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        // create data of valid cart items (valid = only those that are available in db)
        // (in case if admin deleted any product that was added to user's cart) => not valid item
        const popoulateCartItmes = cart.items.map((item) => {
            return {
              productId: item.productId ? item.productId._id : null,
              image: item.productId ? item.productId.image : null,
              title: item.productId ? item.productId.title : null,
              price: item.productId ? item.productId.price : null,
              salePrice: item.productId ? item.productId.salePrice : null,
              quantity: item.quantity,
            }
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            data: {
                ...cart._doc,
                items: popoulateCartItmes,
            }
        });        
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}