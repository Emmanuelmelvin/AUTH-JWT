const express = require("express")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")
const app = express()
app.use(express.json())

const mongoURI = "mongodb://localhost:27017"

mongoose
    .connect(mongoURI, {
        useNweUrlParser: true , useUnifiedTopology: true , useCreateIndex: true
    })
    .then((result) => {
        console.log("mongo acyive!")
        app.listen(3000)
    })
    .catch((error) => {console.log(error)})

    app.get('/', (req, res)=> {

    })

    app.use(authRoutes)