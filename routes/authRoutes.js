const express = require('express')
const router = express.Router()
const authController = require("../controllers/authController")


router.get('/signup',  authController.signupController)

router.get('/signup',  authController.loginController)

module.exports = router;