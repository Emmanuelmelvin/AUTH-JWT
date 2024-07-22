const jwt = require('jsonwebtoken')
const { secretPhrase } = require('../security/jwtSecretPhrase');
const User = require('../models/userModel');

const checkUser = (req , res , next) =>{
    const token = req.cookie.jwt;
    if(token){
        jwt.verify(token , secretPhrase , async(error , decodedToken) => {
            if(error) {
                console.log('unauthorized user')
                res.locals.user  =  null;
                next()
            } else {
                const { id }  = decodedToken
                const user =  await User.findById(id)
                res.locals.user  =  user;
                next()
            }
        })
    } else{
        res.locals.user  =  user;
        next()
    }
}

module.exports =  checkUser