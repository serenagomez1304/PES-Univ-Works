const express = require('express');
const router = express.Router();
const initUsers = require('../../test/UsersData');
const UserModel = require('../../models/userModel');

// Get all users, by email
router.get('/', async (req, res) => {
    console.log("getting user by email")
    try{
        var qq = {}; 
        if(req.query.hasOwnProperty("email")) {
            qq["email"] = req.query.email;
            console.log(qq);
            UserModel.find(qq).exec(function (err, users) {
                res.json(users);
                console.log("returning: "+JSON.stringify(users))
            });
        } else {
            UserModel.find().exec( function(err, users) {
                res.json(users);
                console.log("returning: "+JSON.stringify(users))        
            })
        }
    } catch (err) {
        res.status(500).send({message:err});
    }
});

// Get Single user
router.get('/:id', async(req, res) => {
    try {
        const users = await UserModel.findById(req.params.id);
        res.json(users)
    } catch (err) {
        res.status(404).send({message:err});
    }
});


// Create user
router.post('/', async (req, res) => {
    console.log("Creating user")
    //TODO:  If the email is not unique, do not create user
    var qq = {};
    qq["email"] = req.body.email;
    UserModel.find(qq)
        .exec(function(err, results) {
            if(err) res.json({message:err});
            if(results.length == 0){
                const user = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    status: req.body.status
                });
                try {
                    user.save(function (err, savedUser) {
                        res.json(savedUser);
                        console.log(savedUser);
                    })
                } catch {
                    res.status(500).send({message:err});
                }
            } else {
               res.status(409).send({message:"Email already registered"});
               console.log("Email already registered")
            }
        })
    
});


// Initial with multiple user
router.post('/init', async (req, res) => {
    console.log("Initializing with multiple user")
    initUsers.forEach(user => {
        try {
            var qq = {};
            qq["email"] = user.email;
            UserModel.find(qq)
                .exec(function (err, results) {
                    if(err) res.json({message:err});
                    else {
                        var count = results.length
                        console.log(qq);
                        console.log("found : " + count);
                        if(count === 0) {
                            let newUser = new UserModel({
                                name: user.name,
                                email: user.email,
                                password: user.password,
                                status: user.status
                                });
                            newUser.save(function (err, savedUser) {
                                if(err) res.json({message:err})
                                else {
                                    console.log(savedUser);
                                }
                            })
                        }
                    }
                })
        } catch {
            res.json({message});
        }
    })
    UserModel.find()
        .exec(function (err, results) {
            if(err) res.json({message:err});
            else res.json(results);
    });
})

// Update user
router.patch('/:id', (req, res) => {
    try {
        console.log("Patching: " + req.params.id);
        UserModel.findById(req.params.id).exec(function (err, newUser) {
            console.log(newUser);
            console.log(req.body);
            if(req.body.name) {newUser.name = req.body.name};
            if(req.body.email) {newUser.email = req.body.email};
            if(req.body.password) {newUser.password = req.body.password};
            if(req.body.status) {newUser.status = req.body.status};
            UserModel.updateOne({_id: req.params.id}, newUser).exec(function (err, updatedUser) {
                res.json(updatedUser);
            });
            
        })
    } catch (err) {
        res.json({message:err});
    }
});

// Delete user
router.delete('/:id', (req, res) => {
    console.log("delete user");
    try {
        UserModel.remove({_id: req.params.id}).exec(function (err, removedUser) {
            res.json(removedUser);
        })
    } catch (err) {
        res.json({message:err});
    }
});

module.exports = router;