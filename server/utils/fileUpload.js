const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const uploadFileToCloudinary = async (file, height=1000, quality=100) => {
    // create options
    const folder = process.env.FOLDER_NAME;
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = 'auto';

    // upload file
    const response = await cloudinary.uploader.upload(file.tempFilePath, options);

    // return response
    return response;
}

module.exports = uploadFileToCloudinary;