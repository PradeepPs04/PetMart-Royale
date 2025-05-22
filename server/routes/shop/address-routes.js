const express = require('express');
const { fetchAllAddress, addAddress, deleteAddress, editAddress } = require('../../controllers/shop/address-controllers');


const router = express.Router();

// route to add a new address
router.post('/add', addAddress);

// route to get all addresses
router.get('/get/:userId', fetchAllAddress);

// route to delete an address
router.delete('/delete/:userId/:addressId', deleteAddress);

// route to edit an address
router.put('/edit/:userId/:addressId', editAddress);

module.exports = router;