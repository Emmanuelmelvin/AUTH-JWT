const express = require('express')
const router = express.Router()

// import controller
const authController = require("../controllers/authController")

router.post('/signup',  authController.signupController)

router.post('/login',  authController.loginController)

module.exports = router;