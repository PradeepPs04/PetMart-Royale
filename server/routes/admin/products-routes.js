const express = require('express');
const router = express.Router();

// import controllers
const {
    createProduct,
    editProduct,
    deleteProduct,
    fetchProducts,
    fetchTopSellingProducts
} = require('../../controllers/admin/products-controller');

// route to create product
router.post('/create', createProduct);

// route to edit product
router.put('/edit/:id', editProduct);

// router to delete product
router.delete('/delete/:id', deleteProduct);

// route to fetch all products
router.get('/get', fetchProducts);

// route to fetch top selling products
router.get('/get-top-selling', fetchTopSellingProducts);

module.exports = router;