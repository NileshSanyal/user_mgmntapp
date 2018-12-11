var mongoose = require('mongoose');

var User = require('../models/user.model');
// var perPage = config.PAGINATION_PERPAGE;
var _ = require('underscore');

var userRepository = {
    fineOneWithEmail: function (params, cb) {
        
        User.findOne({
            email: params.email,
            isDeleted: false,
            status: "Active"
        }).exec(function (err, user) {
            if (err)
                return cb(err, null);
            if (!user) {
                return cb('Authentication failed. User not found.', null);
            } else if (user) {
                // check if password matches
                if (!user.validPassword(params.password)) {
                    return cb('Authentication failed. Wrong password.', null);
                } else {
                    return cb(null, user);
                }
            }
        });
    },

    getById: function (id, cb) {

        User.findOne({ _id: id }).exec(function (err, result) {

            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });

    },

    getByField: function (params, cb) {
        User.findOne(params, function (err, result) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });

    },

    getAllByField: function (params, cb) {
        User.find(params, function (err, result) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, result);
            }

        });
    },


    delete: function (id, cb) {
        User.findById(id, function (err, user_data) {
            if (err)
                return cb(err.message, null);

            User.findByIdAndUpdate(id, { isDeleted: 'yes' }, { new: true }, function (err, result) {
                if (err)
                    return cb(err.message, null);

                else
                    return cb(null, result);

            });
        });
    },

    updateById: function (data, id, cb) {

        User.findByIdAndUpdate(id, data, { new: true }, function (err, result) {
            if (err)
                return cb(err, null);

            else
                return cb(null, result);

        });
    }

};

module.exports = userRepository;