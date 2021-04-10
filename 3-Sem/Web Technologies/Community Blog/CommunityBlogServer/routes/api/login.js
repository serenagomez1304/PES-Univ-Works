const express = require('express');
const uuid = require('uuid');
const router = express.Router();
// const UserModel = require('../../models/userModel');
const userSession = require('../../controllers/userSession.js')

// Login user
router.post('/login', async (req, res) => {
    console.log("Login user")
    // If user & password matches, generate a token & return token
    // else return error - login failed
    // try {
        userSession.findUser(req.body.email, function(foundUser) {
            console.log("Found user");
            console.log(foundUser);
            console.log('compare : ' + req.body.password + ' & ' + foundUser.password);
            if(req.body.password.localeCompare(foundUser.password) === 0) {
                console.log("In localeCompare");
                userSession.newUserSession(foundUser, function(uSession) {
                    console.log("In userSession.newUserSession()");
                    console.log(uSession);
                    res.json(uSession);
              });
            } else {
                console.log("Invalid user/password");
                // err = new Error('Invalid user/password');
                // throw err;
                res.sendStatus(401);
            }
        });
});


module.exports = router;