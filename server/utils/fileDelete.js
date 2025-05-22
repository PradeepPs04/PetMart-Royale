const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const deleteFromCloudinary = async (url, type) => {
    const folder = process.env.FOLDER_NAME;
    const options = {resource_type: type};

    // get public id from image url
    const public_id = url.split('/').pop().split('.').at(0).trim();

    const path = `${folder}/${public_id}`;

    // delete from cloudinary
    await cloudinary.uploader.destroy(path, options);
} 

module.exports = deleteFromCloudinary;