const jwt = require('jsonwebtoken')
const { secretPhrase } = require('../security/jwtSecretPhrase')

const requireAuth = async  (req,  res , next)  => {

    const token = req.cookies.jwt

    //check if it exists and isverified
    if(token){
        jwt.verify(token , secretPhrase , (error , decodedToken) => {
            if(error) {
                console.log('unauthorized user')
                res.send('unauthorized')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else{
        console.log('User need to login first')
    }
}

module.exports = {requireAuth}