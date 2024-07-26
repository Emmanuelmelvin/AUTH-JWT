const jwt = require('jsonwebtoken');
const { secretPhrase } = require('../security/jwtSecretPhrase');
const User = require('../models/userModel');

// Ensure that the cookie-parser middleware is used in your Express app
const checkUser = (req, res, next) => {
    const token = req.cookies?.jwt; // Correctly accessing the cookie

    if (token) {
        jwt.verify(token, secretPhrase, async (error, decodedToken) => {
            if (error) {
                console.log('Unauthorized user');
                res.locals.user = null;
                next();
            } else {
                const { id } = decodedToken;
                const user = await User.findById(id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = checkUser;
