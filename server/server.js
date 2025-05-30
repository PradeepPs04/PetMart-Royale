const express = require('express');
require('dotenv').config();

// importing middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// importing configs
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');

// importing routes
const authRoutes = require('./routes/auth/auth-routes');
const adminProductsRoutes = require('./routes/admin/products-routes');
const shopProductsRoutes = require('./routes/shop/product-routes');
const shopCartRoutes = require('./routes/shop/cart-routes');
const shopAddressRoutes = require('./routes/shop/address-routes');
const shopOrderRoutes = require('./routes/shop/order-routes');
const adminOrderRoutes = require('./routes/admin/order-routes');
const searchRoutes = require('./routes/search/search-routes');
const shopReviewRoutes = require('./routes/shop/review-routes');
const commonFeatureRoutes = require('./routes/common/feature-routes');

const app = express();

// connect to database
dbConnect();

// connect to cloudinary
cloudinaryConnect();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        // 'http://localhost:5173',
        // change origin for local development
        origin: 'https://pet-mart-royale.vercel.app/', 
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    })
);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/',
}));

// mounting routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin/products', adminProductsRoutes);
app.use('/api/v1/shop/products', shopProductsRoutes);
app.use('/api/v1/shop/cart', shopCartRoutes);
app.use('/api/v1/shop/address', shopAddressRoutes);
app.use('/api/v1/shop/order', shopOrderRoutes);
app.use('/api/v1/admin/order', adminOrderRoutes);
app.use('/api/v1/shop/search', searchRoutes);
app.use('/api/v1/shop/review', shopReviewRoutes);
app.use('/api/v1/common/feature', commonFeatureRoutes);

// get port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started at ", PORT);
});

// testing route
app.get('/', (_, res) => res.send(`<h1>Hello world</h1>`));