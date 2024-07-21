const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoutes")
const app = express()

//middlewares
app.use(express.json())
app.use(authRoutes)
app.use(cookieParser())

const mongoURI = "mongodb://localhost:27017"

mongoose
    .connect(mongoURI)
    .then((result) => {
        console.log("mongo active!")
        app.listen(3000)
    })
    .catch((error) => { console.log(error) })

app.get('/', (req, res) => {
    res.send("Active")
})

app.get('/set-cookies', (req, res) => {
    //this creates a cookie with the name newuser and its value set to true
    // res.setHeader('Set-cookies' , 'newuser=trye')

    //after the using the cookieParser middleware, cookie can be assesed as a property in the res object
    res.cookie('newUser' , false , {
        maxAge: 1000 * 60 * 60 * 24,  //sets the expiry date of a cookie
        secure: true, //only sent over a secure connection i.e https
        httpOnly:  true // cannot be accessed from the frontend, only between browser and server
    })
    res.send('you got a cookie')
})

app.get('/read-cookies' , (req , res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})