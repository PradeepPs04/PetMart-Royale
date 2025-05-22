const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// models
const User = require('../../models/User');


// controller to create an account
exports.signup = async (req, res) => {
    try {
        // fetch data
        const { userName, email, password } = req.body;

        // validate data
        if(!userName || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fileds are reuqired",
            });
        }

        // check if email or user name already used
        const checkUser = await User.findOne({
            $or: [
                {userName: userName},
                {email: email},
            ]
        });

        if(checkUser) {
            return res.status(409).json({
                success: false,
                message: "User name or email id already used",
                data: checkUser,
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const createdUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        // return success response
        return res.status(200).json({
            success: true,
            message: "Account created successfully",
            data: createdUser,
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

// login
exports.login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body;

        // validate data
        if(!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fileds are reuqired",
            });
        }

        // search user in db
        const userDetails = await User.findOne({email});

        // check if email id is registered or not
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exists! Please signup first",
            });
        }

        // check if password is matching or not
        const checkPasswordMatch = await bcrypt.compare(password, userDetails.password);

        if(!checkPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
        
        // create jwt token
        const jwtPayload = {
            id: userDetails._id,
            role: userDetails.role,
            email: userDetails.email,
            userName: userDetails.userName,
        }
        const jwtOptions = {
            expiresIn: '60m',
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);

        // store token in cookie and return success response
        const cookieOptions = {
            httpOnly: true,
            secure: false,
        }
        res.cookie('token', token, cookieOptions).json({
            success: true,
            message: "Login successfully",
            user: {
                id: userDetails._id,
                email: userDetails.email,
                role: userDetails.role,
            },
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

// logout
exports.logout = (req, res) => {
   // clear cookie
   res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully',
   })
}