const express = require('express');
const { addFeatureImage, getFeatureImage, deleteFeatureImage } = require('../../controllers/common/feature-controller');

const router = express.Router();

// route to add feature image
router.post('/add', addFeatureImage);

// route to fetch all feature images
router.get('/get', getFeatureImage);

// route to delete feature image
router.delete('/delete/:id', deleteFeatureImage);

module.exports = router;