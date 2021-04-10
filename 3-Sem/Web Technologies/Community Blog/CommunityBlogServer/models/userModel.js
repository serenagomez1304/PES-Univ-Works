const mongoose = require('mongoose');

const UserSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Users', UserSchema);