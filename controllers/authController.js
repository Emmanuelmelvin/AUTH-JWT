const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { secretPhrase } = require('../security/jwtSecretPhrase')

const handleErrors = (err) => {
    let error = { email: "", password: "" }

    //validation errors

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors)
            .forEach(({ properties }) => {
                error[properties.path] = properties.message
            });

    }

    //incorrect email
    if (err.message === "incorrect email address") {
        error.email = "user not found"
        return error
    }

    //incorrect password
    if (err.message === "incorrect password") {
        error.password = "incorrect password"
        return error
    }

    // duplicate error code
    if (err.code = 11000) {
        error.email = "Email already exits!"
        return error;
    }

    //login errors

    return error;
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, secretPhrase , {
        expiresIn: maxAge
    })
}

exports.signupController = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(201).json({
            status: "success",
        })
    } catch (error) {
        const errorObjext = handleErrors(error)
        res.status(401).json({
            status: "failed",
            body: errorObjext
        })
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpPnly: true,
            maxAge: maxAge * 1000
        })
        res.status(200).json({ user: user._id })

    } catch (error) {
        console.log(error.message)
        const errorObjext = handleErrors(error)
        res.status(401).json({
            status: "failed",
            body: errorObjext
        })
    }

}

exports.logoutController = (req , res) => {
    res.cookie('jwt' ,  ' ' , { maxAge: 1 })
    res.status(200).json({
        status: 'success'
    })
    console.log('User logged out')
}