const Feature = require('../../models/Feature');
const deleteFromCloudinary = require('../../utils/fileDelete');
const uploadFileToCloudinary = require('../../utils/fileUpload');

// controller to add feature image
exports.addFeatureImage = async (req, res) => {
    try {
        // fetch data
        const image = req.files?.image;

        // upload iamge to cloudinary
        const uploadedImage = await uploadFileToCloudinary(image);

        // create feature
        const createdFeature = await Feature.create({image: uploadedImage.secure_url});

        // return success response
        return res.status(200).json({
            success: true,
            message: "Feature image added successfully",
            data: createdFeature,
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

// controller to get all feature images
exports.getFeatureImage = async (req, res) => {
    try {
        // fetch all featuer
        const allFeatures = await Feature.find({});
        
        // return success response
        return res.status(200).json({
            success: true,
            message: "All feature images fetched successfully",
            data: allFeatures,
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

// controller to delete a feature image
exports.deleteFeatureImage = async (req, res) => {
    try {
        // fetch data
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({
                success: false,
                message: "ID is required",
            });
        }

        // delete feature from db
        const deletedFeature = await Feature.findByIdAndDelete(id);

        if(!deletedFeature) {
            return res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }

        // delete feature image
        await deleteFromCloudinary(deletedFeature?.image, "image");

        // return success response
        return res.status(200).json({
            success: true,
            message: "Feature deleted successfully",
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