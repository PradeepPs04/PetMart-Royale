const express = require('express');
const router = express.Router();

// importing middlewares
const { isAuth } = require('../../middlewares/auth');

// importing controllers
const { signup, login, logout } = require('../../controllers/auth/auth-controller');


// route to signup new user
router.post('/signup', signup);

// route to login user
router.post('/login', login);

// route to logout user
router.post('/logout', logout);

router.get('/check-auth', isAuth, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated user',
        user: user,
    })
})

module.exports = router;