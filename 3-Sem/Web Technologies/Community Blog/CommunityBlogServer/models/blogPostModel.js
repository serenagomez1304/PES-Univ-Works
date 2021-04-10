const mongoose = require('mongoose');

const BlogPostSchema =  mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    created_at:{
        type : Date, 
        default: Date.now,
        required: true
    },
    updated_at:{
        type : Date, 
        default: Date.now,
        required: false
    },
    category:{
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        required: false
    },
    blogText: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BlogPosts', BlogPostSchema);