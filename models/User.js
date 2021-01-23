const mongoose = require('mongoose');
const { Journals } = require('./Journal');

//new User Schema for adding new User
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
})

const Users = mongoose.model('User', UserSchema);

module.exports = {Users, UserSchema}