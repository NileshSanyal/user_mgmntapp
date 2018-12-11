var User = require('user/models/user.model');
var Q = require('q');

var userRepo = require('../user/repositories/user.repository');

var mongoose = require('mongoose');

var _ = require('underscore');
var bcrypt = require('bcryptjs');
var fs = require('fs');

var jwt = require('jsonwebtoken');

/* @Method: signin
// @Description: user Login
*/
exports.signin = function (req, res) {
    var deferred = Q.defer();
    // find the user
    userRepo.fineOneWithEmail(req.body, function (err, user) {

        if (err) {
            deferred.reject({ "status": 500, "error": true, data: [], "message": err });
        } else {
            if (!_.isEmpty(user)) {

                const payload = {
                    id: user._id
                };

                var token = jwt.sign(payload, config.jwtSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                req.session.token = token;
                req.user = user;
                var user_details = {};
                user_details.id = user._id;
                user_details.first_name = user.first_name;
                user_details.last_name = user.last_name;
                user_details.email = user.email;

                // return the information including token as JSON
                deferred.resolve({ "status": 200, token: token, data: [user_details], "message": "You have successfully logged in" });
            } else {
                deferred.reject({ "error": true, "status": 500, data: [], "message": 'Authentication failed. Wrong credentials.' });
            }

        }
    });
    return deferred.promise;
};

/* @Method: store
// @Description: user create action
*/
exports.store = function (req, res) {


    var deferred = Q.defer();

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var userId = req.body.id;

    if(typeof userId !== "undefined"){

        /**/
        userRepo.getByField({ 'email': req.body.email, 'isDeleted': false, '_id': { $ne: userId } }, function (err, result) {

            if (_.isEmpty(result)) {
    
                if (!(_.isEmpty(req.body.password))) {
                    req.body.password = bcrypt.hashSync(req.body.password, 8);
                }
    
                userRepo.updateById(req.body, req.body.id, function (err, result) {
                    if (err) {
                        deferred.reject({ "status": 500, "error": true, data: [], "message": err });
                    } else {
    
                        deferred.resolve({ "status": 200, user: result, "message": "User Updated Successfully" });
    
                    }
                });
    
            } else {
    
                deferred.reject({ "status": 403, "error": true, "message": "This email address already exists!" });
            }
    
        });
        /**/

        //
       
        //


        
    }
    else{
        User.find({ email: req.body.email }, { password: 0 }, function (err, users) {
            console.log('Line 96: ', users);
        if (err) {

            deferred.reject({ "status": 500, "error": true, "message": "Error fetching user data from db" });


        }
        if (_.isEmpty(users)) {
            // if (!(_.isEmpty(req.files))) {
                console.log('Line 105: ', JSON.stringify(req.body, undefined, 2));
                User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hashedPassword
                    // profile_pic: req.files[0].filename
                }, function (err, user) {

                    if (err) {

                        deferred.reject({ "status": 500, "error": true, "message": "Error saving user to db" });

                    }

                    else {

                        deferred.resolve({ "status": 200, "error": false, user: user, "message": "User registered successfully" });


                    }

                });
            // }

            /* else {


                deferred.reject({ "status": 403, "error": true, "message": "Please upload profile picture" });

            } */

        }

        else {
            
            deferred.reject({ "status": 403, "error": true, "message": "Email already in use, try using another email" });


            if (!(_.isEmpty(req.files))) {

                var filePath = './public/uploads/profile_pic/' + req.files[0].filename;

                fs.unlink(filePath, function (err) {
                    if (err)
                        console.log('Error removing file');
                });

            }

        }

        });
    }

    

    return deferred.promise;
};

/* @Method: update
// @Description: user update action
*/
exports.update = function (req) {
    var deferred = Q.defer();
    var filePath = '';

   /*  if (req.files.length > 0) {

        userRepo.getById(req.params.id, function (err, user) {
            if (!_.isEmpty(user.profile_pic)) {

                filePath = 'public/uploads/profile_pic/' + user.profile_pic;

                fs.unlink(filePath, function (err) {
                    if (err) {
                        deferred.reject({ "status": 500, data: [], "message": err.message });
                    }
                });
            }

        });
        req.body.profile_pic = req.files[0].filename;
    } */

    userRepo.getByField({ 'email': req.body.email, 'isDeleted': false, '_id': { $ne: req.params.id } }, function (err, result) {

        if (_.isEmpty(result)) {

            if (!(_.isEmpty(req.body.password))) {
                req.body.password = bcrypt.hashSync(req.body.password, 8);
            }

            userRepo.updateById(req.body, req.params.id, function (err, result) {
                if (err) {
                    deferred.reject({ "status": 500, "error": true, data: [], "message": err });
                } else {

                    deferred.resolve({ "status": 200, user: result, "message": "User Updated Successfully" });

                }
            });

        } else {

            deferred.reject({ "status": 403, "error": true, "message": "This email address already exists!" });
        }

    });

    return deferred.promise;
};


/* @Method: list
// @Description: To get all the users from DB
*/
exports.list = function (req, res) {
    var deferred = Q.defer();
    userRepo.getAllByField({ "isDeleted": false }, function (err, result) {
        if (err) {
            deferred.reject({ "status": 500, data: [], "message": err });
        /* } else {
            deferred.resolve({ "status": 200, data: result, "message": "Users Fetched Successfully" });
        } */
        }else if(result.length > 0){
            deferred.resolve({ "status": 200, data: result, "message": "Users Fetched Successfully" });
        }
        else{
            deferred.resolve({ "status": 200, data: result, "message": "No Users found!" });
        }
    })
    return deferred.promise;
};

/*
// @Method: getUserById
// @Description: Get single user data by his/her id
*/
exports.getUserById = function (req, res){
    var deferred = Q.defer();
    // console.log(req.params.id);
    userRepo.getById(req.params.id, function (err, result){
        if (err)
            deferred.reject({ "status": 500, "error": true, data: [], "message": err });

        deferred.resolve({ "status": 200, data: result, "message": "User details fetched successfully"  });       
       

    });


    return deferred.promise;
};


/*
// @Method: status_change
// @Description: User status change action
*/
exports.status_change = function (req, res) {
    var deferred = Q.defer();

    userRepo.getById(req.params.id, function (err, result) {
        if (err)
            deferred.reject({ "status": 500, "error": true, data: [], "message": err });

        userStatus = (result.status == "Active") ? "Inactive" : "Active";

        userRepo.updateById({ 'status': userStatus }, req.params.id, function (err, result) {
            deferred.resolve({ "status": 200, data: result, "message": "User status has changed successfully" });
        });
    });
    return deferred.promise;
};


/* @Method: delete
// @Description: User delete
*/
exports.destroy = function (req, res) {
    var deferred = Q.defer();
    userRepo.delete(req.params.id, function (err, result) {
        if (err) {
            deferred.reject({ "status": 500, "error": true, "message": err });
        } else {
            deferred.resolve({ "status": 200, data: result, "message": "User deleted Successfully" });
        }
    });
    return deferred.promise;
};