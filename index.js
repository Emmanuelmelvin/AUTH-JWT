const express = require("express")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")
const app = express()

//middlewares
app.use(express.json())

const mongoURI = "mongodb://localhost:27017"

mongoose
    .connect(mongoURI)
    .then((result) => {
        console.log("mongo active!")
        app.listen(3000)
    })
    .catch((error) => {console.log(error)})

    app.get('/', (req, res)=> {
        res.send("Active")
    })

    app.use(authRoutes)