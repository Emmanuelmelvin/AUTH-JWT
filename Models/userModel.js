const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt")

// Create a schema
const Schema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 8
    }
});

//fire a function after a new user has been saved to the database.
// Schema.post('save' , (doc , next) => {
//     console.log("new user created and saved succesfully" , doc)
//     next()
// })

//fire a function before a doc is saved
Schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//static methos to login user
Schema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }

    throw Error('incorrect email address')
}


const User = mongoose.model('user', Schema);
module.exports = User