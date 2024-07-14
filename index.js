const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const mongoURI = "mongodb://localhost:27017"

mongoose
    .connect(mongoURI, {

    })
    .then((result) => {
        console.log("mongo acyive!")
        app.listen(3000)
    })
    .catch((error) => {console.log(error)})

    app.get('/', (req, res)=> {
        
    })