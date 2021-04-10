const express = require('express');
const router = express.Router();
const fs = require('fs');
const BlogPostModel = require('../../models/blogPostModel');
const auth = require("../../middleware/authn.js")


// Get all blog posts
router.get('/', async (req, res) => {
    console.log("getting all blog posts")
    auth.authn(req, function(isValid) {
            if(isValid){
            try{
                var qq = {}; 
                if(req.query.hasOwnProperty("category")) {
                    qq["category"] = req.query.category;
                    console.log(qq);
                }
                BlogPostModel.find(qq).exec(function (err, blogPosts) {
                    res.json(blogPosts);
                    console.log("returning: "+JSON.stringify(blogPosts))
                });

            } catch (err) {
                res.json({message:err});
            }
        } else {
            res.sendStatus(401)
        }
    })
});

// Get single blog post
router.get('/:blogId', async(req, res) => {
    auth.authn(req, function(isValid) {
        if (!isValid) res.sendStatus(401) 
        else {
            try {
                BlogPostModel.findById(req.params.blogId).exec(function(err, blogPosts){
                    res.json(blogPosts)
                });
            } catch (err) {
                res.json({message:err});
            }
        }
    })
});

// Create a blog post
router.post('/', async (req, res) => {
    console.log("posting")
    auth.authn(req, function(isValid) {
        if (!isValid) res.sendStatus(401) 
        else {
            const blogPost = new BlogPostModel({
                blogTitle: req.body.blogTitle,
                author: req.body.author,
                created_at: Date.now(),
                category: req.body.category,
                voteCount: 0,
                blogText: req.body.blogText,
                status: req.body.status
            });
            try {
                blogPost.save(function(err, savedBlogPost){
                    res.json(savedBlogPost);
                    console.log(savedBlogPost);
                })
            } catch (err) {
                res.json({message:err});
            }
        }
    })
})

// Update a blog post
router.patch('/:blogId', async (req, res) => {
    auth.authn(req, function(isValid) {
        if (!isValid) res.sendStatus(401) 
        else {
            try {
                // const updatedBlogPost = await BlogPostModel.updateOne(
                //     {_id: req.params.blogId}, 
                //     { $set:{blogTitle: req.body.blogTitle, category:req.body.category, updated_at:Date.now(), status:req.body.status, blogText:req.body.blogText, voteCount:req.body.voteCount}}
                // );
                console.log("Patching: " + req.params.blogId);
                BlogPostModel.findById(req.params.blogId).exec(function(err, newBlogPost){
                    console.log(newBlogPost);
                    console.log(req.body);
                    if(req.body.blogTitle) {newBlogPost.blogTitle = req.body.blogTitle};
                    if(req.body.category) {newBlogPost.category = req.body.category};
                    if(req.body.status) {newBlogPost.status = req.body.status};
                    if(req.body.blogText) {newBlogPost.blogText = req.body.blogText};
                    //if(req.body.voteCount) 
                    {newBlogPost.voteCount = req.body.voteCount};
                    newBlogPost.updated_at = Date.now();
                    BlogPostModel.updateOne({_id: req.params.blogId}, newBlogPost).exec(function(err, updatedBlogPost){
                        res.json(updatedBlogPost);
                    })
                });
            } catch (err) {
                res.json({message:err});
            }
        }
    })
});

// Delete a blog post
router.delete('/:blogId', async (req, res) => {
    console.log("delete blog post");
    auth.authn(req, function(isValid) {
        if (!isValid) res.sendStatus(401) 
        else {
            try {
                BlogPostModel.remove({_id: req.params.blogId}).exec(function(err, removedBlogPost){
                    res.json(removedBlogPost);
                });
            } catch (err) {
                res.json({message:err});
            }
        }
    })
});

module.exports = router;