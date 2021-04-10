const mongoose = require('mongoose');

const UserSessionSchema =  mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    token:{
        type: String,
        required: true
    },
    refresh_token:{
        type: String,
        required: true
    },
    token_issued_at:{
        type: Date,
        required: true
    },
    token_expire_at:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);