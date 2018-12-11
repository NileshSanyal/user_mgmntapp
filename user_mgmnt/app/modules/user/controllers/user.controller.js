var User = require('user/models/user.model');
var Q = require('q');
var userRepo = require('user/repositories/user.repository');
// var friendRepo = require('friend/repositories/friend.repository');
// var countryRepo = require('country/repositories/country.repository');
// var cityRepo = require('city/repositories/city.repository');
var _ = require('underscore');
var perPage = config.PAGINATION_PERPAGE;


/* @Method: Create
// @Description: user create Render
*/
exports.create = function (req, res) {
    var deferred = Q.defer();

    /* friendRepo.getAllByField({ 'isDeleted': false }, function (friendErr, result) {

        if (friendErr)
            deferred.reject({ "status": 500, data: [], "message": friendErr });
        else {
            countryRepo.getAllByField({ 'isDeleted': false }, function (countryErr, countries) {
                if (countryErr)
                    deferred.reject({ "status": 500, data: [], "message": countryErr });
                else {
                    cityRepo.getAllByField({ 'isDeleted': false }, function (cityErr, cities) {

                        if (cityErr)
                            deferred.reject({ "status": 500, data: [], "message": cityErr });
                        else
                            deferred.resolve({ "status": 200, data: result, countries: countries, cities: cities });


                    });


                }


            });

        }

    }); */

    return deferred.promise;
};

/* @Method: store
// @Description: user create action
*/
exports.store = function (req, res) {


    var deferred = Q.defer();
    userRepo.getByField({ 'email': req.body.email, 'isDeleted': false }, function (err, result) {
        if (err) {
            deferred.reject({ "status": 500, data: [], "message": err });
        } else {
            if (_.isEmpty(result)) {

                userRepo.save(req.body, function (err, result) {
                    if (err) {
                        deferred.reject({ "status": 500, data: [], "message": err });
                    } else {
                        deferred.resolve({ "status": 200, data: result, "message": "User Created Successfully" });
                    }
                });

            } else {

                deferred.reject({ "status": 500, data: [], "message": "This email address already exists!" });
            }


        }

    });


    return deferred.promise;
};


/*
// @Method: edit
// @Description:  render user update page
*/
exports.edit = function (req, res) {
    var deferred = Q.defer();
    var strFriendsId = '';
    var friendsIdArr = [];
    userRepo.getById(req.params.id, function (err, result) {


        for (var i = 0; i < result[0].user_id.friends.length; i++) {

            strFriendsId = result[0].user_id.friends.join(',');

        }
        // console.log('105: ', strFriendsId);
        friendsIdArr.push(strFriendsId);
        // console.log('104: ',friendsIdArr); 
        
        if (err)
            deferred.reject({ "status": 500, data: [], "message": err });

        else {

            /* friendRepo.getAllByField({ "isDeleted": false }, function (err, friends) {

                if (err)
                    deferred.reject({ "status": 500, data: [], "message": err });
                else {

                    countryRepo.getAllByField({ 'isDeleted': false }, function (err, countries) {

                        if (err)
                            deferred.reject({ "status": 500, data: [], "message": err });
                        else {

                            cityRepo.getAllByField({ 'isDeleted': false }, function (cityErr, cities) {

                                if (cityErr)
                                    deferred.reject({ "status": 500, data: [], "message": cityErr });
                                else {

                                    // console.log('114: ', JSON.stringify(friends, undefined, 2));

                                    // console.log('126: ',strFriendsId);
                                    console.log('128 data arr: ', JSON.stringify(result, undefined, 2));

                                    console.log('129 friends arr: ', JSON.stringify(friends, undefined, 2));
                                    
                                    deferred.resolve({ "status": 200, data: result, allFriendsId: strFriendsId, friends: friends, friendsIdArr: friendsIdArr, countries: countries, cities: cities, "message": "User Fetched Successfully" });
                                }

                            });

                        }

                    });

                }

            }); */

        }

    });
    return deferred.promise;
};

/* @Method: update
// @Description: user update action
*/
exports.update = function (req, res) {
    var deferred = Q.defer();

    userRepo.getByField({ 'email': req.body.email, 'isDeleted': false, '_id': { $ne: req.body.userId } }, function (err, result) {

        if (err) {
            deferred.reject({ "status": 500, data: [], "message": err });
        }
        else {

            if (_.isEmpty(result)) {

                userRepo.updateById(req.body, req.body.userId, function (err, result) {
                    if (err) {
                        deferred.reject({ "status": 500, data: [], "message": err });
                    } else {

                        deferred.resolve({ "status": 200, data: result, "message": "User Updated Successfully" });

                    }
                });

            } else {

                deferred.reject({ "status": 500, data: [], "message": "This email address already exists!" });
            }

        }

    });

    return deferred.promise;
};


/* @Method: list
// @Description: To get all the users from DB
*/
exports.list = function (req, res) {
    var deferred = Q.defer();
    var currentPage = req.query.page || 1
    var sortOrder = { 'createdAt': -1 };
    var data = [];
    /* userRepo.getAll(req.query, sortOrder, currentPage, function (err, result, total) {

        if (err)
            deferred.reject({ "status": 500, data: [], "message": err });
        else {

            friendRepo.getAllByField({ "isDeleted": false }, function (friendErr, friends) {

                if (friendErr)
                    deferred.reject({ "status": 500, data: [], "message": friendErr });
                else {
                    countryRepo.getAllByField({ "isDeleted": false }, function (errCountry, countries) {

                        if (errCountry)
                            deferred.reject({ "status": 500, data: [], "message": errCountry });
                        else {
                            cityRepo.getAllByField({ 'isDeleted': false }, function (cityErr, cities) {

                                if (cityErr)
                                    deferred.reject({ "status": 500, data: [], "message": cityErr });

                                else {

                                    // console.log('218: ', JSON.stringify(result, undefined, 2));

                                    deferred.resolve({ "status": 200, data: result, friends: friends, countries: countries, cities: cities, current: currentPage, pages: Math.ceil(result.total_pages / config.PAGINATION_PERPAGE), "message": "Data Fetched Successfully" });
                                }

                            });
                        }
                    });
                }

            });

        }

    }); */
    return deferred.promise;
};

/*
// @Method: status_change
// @Description: User status change action
*/
exports.status_change = function (req, res) {
    var deferred = Q.defer();

    userRepo.getById(req.body.id, function (err, result) {
        if (err)
            deferred.reject({ "status": 500, data: [], "message": err });
        userStatus = (result.isActive == true) ? false : true;
        userRepo.updateById({ 'isActive': userStatus }, req.body.id, function (err, result) {
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
            deferred.reject({ "status": 500, data: [], "message": err });
        } else {
            deferred.resolve({ "status": 200, data: result, "message": "User Removed Successfully" });
        }
    });
    return deferred.promise;
};