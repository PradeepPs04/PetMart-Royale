const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connection successfull"))
        .catch((err) => {
            console.log("DB Connection failed");
            console.error(err);
            process.exit(1);
    });
}

module.exports = dbConnect;