const User = require("../models/userModel")

const handleErrors = (err) => {
    let error = { email: "", password: "" }

    //validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors)
            .forEach(({properties}) => {
                error[properties.path] = properties.message
            });

    }

    // duplicate error code
    if(err.code = 11000){
        error.email = "Email already exits!"
        return error;
    }
    return error;
}

exports.signupController = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        res.status(201).json({
            status: "success",
            user
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

}