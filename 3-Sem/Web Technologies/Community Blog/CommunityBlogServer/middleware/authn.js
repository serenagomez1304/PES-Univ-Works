const userSession = require("../controllers/userSession.js")

const moment = require('moment');

exports.authn = function (req, next) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    console.log(req.headers)
    var token = req.headers['x-token']
    userSession.isValidToken(token, function(isValid) {
        next(isValid);
    })
}