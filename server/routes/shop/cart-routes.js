const express = require('express');
const router = express.Router();

// middlewares
const { isAuth } = require('../../middlewares/auth');

// import controllers
const { 
    addToCart,
    updateCartItemQuantity,
    deleteCartItem,
    fetchCartItems
} = require('../../controllers/shop/cart-controllers');


// route to add am item to cart
router.post('/add', isAuth, addToCart);

// route to update quantity of item in cart
router.put('/update-cart', isAuth, updateCartItemQuantity);

// route to delete an item from cart
router.delete('/delete/:productId', isAuth, deleteCartItem);

// route to getch cart items
router.get('/get', isAuth, fetchCartItems);

module.exports = router;