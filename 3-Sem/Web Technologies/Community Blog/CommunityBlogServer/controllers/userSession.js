const uuid = require('uuid');
const UserModel = require('../models/userModel');
var UserSessionModel = require('../models/userSessionModel.js');

var expiry_duration = 15 * 60 * 1000; // now() + 15 mins

exports.isValidToken = function(inToken, next) {
    try {
        var qq = {};
        qq["token"] = inToken;
        UserSessionModel.find(qq)
            .exec(function (err, results) {
                if(err) throw err;
                else {
                    console.log(results)
                    var count = results.length
                    if(count === 1) { // return the existing token
                        console.log("token already exists");
                        next(true);
                    }
                    else {
                        console.log("invalid token");
                        next(false);
                    }
                }
            })
        }
       
    catch (err) {
        throw err
    }
}

exports.findUser = function(email, next) {
    console.log("Find user")
    var qq = {};
    qq["email"] = email;
    UserModel.find(qq)
        .exec(function (err, results) {
            if(err || results.length < 1) {
                console.log("Failed to find user - ");
                err = new Error("Failed to find user");
                next(err);
            } else {
                founduser = results[0];
                console.log(founduser);
            }
            next(founduser);
        })
}

exports.newUserSession = function(user, next) {
    console.log("email - " + user.email);
    
    try {
        var qq = {};
        qq["id"] = user.email;
        UserSessionModel.find(qq)
            .exec(function (err, results) {
                if(err) throw err;
                else {
                    console.log(results)
                    var count = results.length
                    if(count === 1) { // return the existing token
                        console.log("session already exists")
                        uSession = {
                            id: results[0].id,
                            name: results[0].name,
                            token: results[0].token,
                            refresh_token: results[0].refresh_token,
                            token_issued_at: results[0].token_issued_at,
                            token_expire_at: results[0].token_expire_at
                        }
                        next(uSession)
                    }
                    else {
                        console.log("creating a new user session")
                        var token= uuid.v1();
                        var refresh_token= uuid.v1();
                        var userSession = new UserSessionModel({
                            id: user.email,
                            name: user.name,
                            token: token,
                            refresh_token: refresh_token,
                            token_issued_at: Date.now(),
                            token_expire_at: Date.now() + expiry_duration
                        });
                        try {
                            userSession.save(function (err, savedUserSession){
                                if(err) {
                                    uSession.json({message:err})
                                    throw new Error('Error new user session : ' + err);
                                }
                                else {
                                    console.log(savedUserSession);
                                    uSession = {
                                        id: savedUserSession.id,
                                        name:savedUserSession.name,
                                        token: savedUserSession.token,
                                        refresh_token: savedUserSession.refresh_token,
                                        token_issued_at: savedUserSession.token_issued_at,
                                        token_expire_at: savedUserSession.token_expire_at
                                    }
                                }
                                console.log("exiting newUserSession()")
                                console.log(uSession);
                                next(uSession);
                            })
                        } catch {
                            console.log('Error new user session : ' + err);
                            throw new Error('Error new user session : ' + err);
                        }
                    }
                }
            })
        }
       
    catch (err) {
        throw err
    }
    
}
