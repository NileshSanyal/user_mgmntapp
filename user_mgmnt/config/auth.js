var passport = require("passport");
var passportJWT = require("passport-jwt");

var users = require('../app/modules/user/models/user.model');

var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('x-access-token')
    // jwtFromRequest: ExtractJwt.fromHeader('authorization')
};
var url = require('url');


module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        
        users.findById(payload.id).exec(function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },

        // This is for webservice jwt token check //

        authenticateAPI: function (req, res, next) {
            // check for nonsecure path like login //
            var nonSecurePaths = ['/user/login'];
            if (_.contains(nonSecurePaths, req.path)) return next();
            // check for nonsecure path like login //
            passport.authenticate("jwt", cfg.jwtSession, function (err, user) {
                if (err) { res.send({ status: 500, auth: false, message: "Failed to authenticate token." }); }
                if (!user) {
                    
                     res.send({ status: 500, auth: false, message: "There was a problem finding the user." }); 
                }
                if (user) {
                    req.user = user;
                    return next();
                }

            })(req, res, next);
        }
    };


};

