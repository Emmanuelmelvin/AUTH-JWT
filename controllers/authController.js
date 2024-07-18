const User = require("../models/userModel")

exports.signupController = async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    
    try {
        const user = await User.create({ email, password })
        res.status(201).json({
            status: "success",
            user
        })
    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: "system failure, try again later"
        })
    }
}

exports.loginController = async (req, res) => {
    const { email, password } = req.body

}