const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoutes")
const { requireAuth } = require("./middleware/authMiddlewre")
const checkUser = require("./middleware/checkUser")
const app = express()

//middle
app.use(express.json())
app.use(cookieParser())
app.use(checkUser)
app.use(authRoutes)

const mongoURI = "mongodb://localhost:27017"

mongoose
    .connect(mongoURI)
    .then((result) => {
        console.log("mongodb active!")
        app.listen(8080)
    })
    .catch((error) => { console.log(error) })




    

// app.get('/', (req, res) => {
//     res.send("Active")
// })++b

// app.get('/set-cookies', (req, res) => {
//     //this creates a cookie with the name newuser and its value set to true

//     //after the using the cookieParser middleware, cookie can be assesed as a property in the res object
//     res.cookie('newUser' , false , {
//         maxAge: 1000 * 60 * 60 * 24,  //sets the expiry date of a cookie
//         secure: true, //only sent over a secure connection i.e https
//         httpOnly:  true // cannot be accessed from the frontend, only between browser and server
//     })
//     res.send('you got a cookie')
// })

// app.get('/read-cookies' , (req , res) => {
//     const cookies = req.cookies
//     console.log(cookies)
//     res.json(cookies)
// })

//route sampling
app.get('/auth' , requireAuth , (req , res) => {
    res.send('User in!')
    console.log("User in")
})

app.get('/post', (req, res) => {
    const user = res.locals.user;

    if (user) {
        res.send(`Welcome, ${user.email}`);
    } else {
        res.send('Please log in to access the dashboard.');
    }
});
