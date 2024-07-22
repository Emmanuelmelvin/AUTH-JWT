const jwt =require('jsonwebtoken')

const requireAuth = async  (req,  res , next)  => {

    const token = req.cookies.jwt

    //checkifit exists and isverified
    if(token){
        jwt.verify(token,  'meme' , (error , decodedToken) => {
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