var express = require('express');
var routeLabel = require('route-label');
var router = express.Router();
var namedRouter = routeLabel(router);
var querystring = require('querystring');


var multer = require('multer');
var userController = require('../../modules/webservice/user.controller');

var Storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./public/uploads/profile_pic");
	}
	, filename: function (req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

var uploadFile = multer({ storage: Storage });
var request_param = multer();

/**
 * @api {post} http://localhost:3000/api/user/create  User Create
 * @apiGroup Users
 * @apiParam {string} first_name First Name
 * @apiParam {string} last_name Last Name
 * @apiParam {string} email Email
 * @apiParam {string} phone Phone
 * @apiParam {string} password Password
 * @apiParam {file} profile_pic User's profile picture
 * @apiSuccessExample {json} Success
 *{
	"user": {
		"first_name": "Nilesh ",
		"last_name": "Sanyal",
		"email": "sam@gmail.com",
		"phone": "9965432133",
		"password": "$2a$08$VVOnIwyQbnNMf3l44J8s6Ov2Fe/7B4Y5ChAO.fUZMu7fs4ltFps.q",
		"profile_pic": "",
		"status": "Active",
		"isDeleted": false,
		"_id": "5c0b9d32e2d3133db18eb8e1",
		"date": "2018-12-08T10:30:10.276Z",
		"__v": 0
	},
	"message": "User registered successfully"
}
*/


/**
 * @api {post} http://localhost:3000/api/user/create  Update User Data
 * @apiGroup Update User
 * @apiParam {string} first_name First Name
 * @apiParam {string} last_name Last Name
 * @apiParam {string} email Email
 * @apiParam {string} phone Phone
 * @apiParam {string} id User Id
 * @apiParam {string} password Password
 * @apiParam {file} profile_pic User's profile picture
 * @apiSuccessExample {json} Success
 *{
    "user": {
        "first_name": "Andrew",
        "last_name": "Howards",
        "email": "hawkinss@gmail.com",
        "phone": "9965432144",
        "password": "$2a$08$rzt12jpal8VXNpcGw4SLy.j9RHhRvt8GYvbhRWxCKaSV49q86KL/q",
        "profile_pic": "",
        "status": "Active",
        "isDeleted": false,
        "_id": "5c0e040798333415c30e9af1",
        "date": "2018-12-10T06:13:27.508Z",
        "__v": 0
    },
    "message": "User Updated Successfully"
}
*/


// @Route: Create User Action

namedRouter.post("user.create", '/user/create', uploadFile.any(), function (req, res) {
    
	userController.store(req).then(function (success) {

        res.status(success.status).json({ user: success.user, "message": success.message});

	}, function (failure) {

		res.status(failure.status).json({ "error": failure.error, "message": failure.message });



	});

});

/**
 * @api {post} http://localhost:3000/api/user/login  User Login
 * @apiGroup Users
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiSuccessExample {json} Success
 *{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMGI0ODJkOTE0YTEzMjk1YTM3Mjc5YiIsImlhdCI6MTU0NDI0NDI4MSwiZXhwIjoxNTQ0MzMwNjgxfQ.kzDCWmeRu9E8zqSstZUnmAOakwAQeESxdBll07M2L_Q",
	"id": "5c0b482d914a13295a37279b",
	"email": "nil2take1@gmail.com",
	"message": "You have successfully logged in"
}
*/
            

/*
// @Route: User login
*/
namedRouter.post("user.login", '/user/login', request_param.any(), function (req, res) {

	userController.signin(req).then(function (success) {
        console.log(success);
		res.status(success.status).json({"token": success.token, "id": success.data[0].id, "email": success.data[0].email, "message": success.message});

	}, function (failure) {

		res.status(failure.status).json({ "error": failure.error, "message": failure.message });

	});

});



namedRouter.all('/*', auth.authenticateAPI);


/**
 * @api {get} http://localhost:3000/api/user/list  User List
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [
        {
            "first_name": "Sam",
            "last_name": "Jones",
            "email": "sam@yahoo.com",
            "phone": "7874565785",
            "password": "$2a$08$oHNZIEHbshTk4eNC9EXtO.At6R2GAZZwTvyoj1rAm.MJd4mNCSnbS",
            "profile_pic": "profile_pic_1542792368453_nature2.jpeg",
            "status": "Inactive",
            "isDeleted": false,
            "_id": "5bf4ff849219352131e04e72",
            "date": "2018-11-21T06:47:32.573Z",
            "__v": 0
        },
        {
            "first_name": "Charls",
            "last_name": "Dickens",
            "email": "charls@gmail.com",
            "phone": "9874565554",
            "password": "$2a$08$bhrPkLUTJi56cK8R1y9UQ.JvGINro1M3fOvLVJG/J1b.Wu5/G.AHC",
            "profile_pic": "profile_pic_1542783278141_nature.jpeg",
            "status": "Active",
            "isDeleted": false,
            "_id": "5bf5012e9ab22522c2578098",
            "date": "2018-11-21T06:54:38.213Z",
            "__v": 0
        },
        {
            "first_name": "Samie",
            "last_name": "Hopkins",
            "email": "samie@yahoo.com",
            "phone": "7874565785",
            "password": "$2a$08$g.hHUPlyQ9J6hT00SCRo0.zzfZ.w0RP5N7M7i9ql2NjayITfsOhLO",
            "profile_pic": "profile_pic_1542792974075_nature2.jpeg",
            "status": "Active",
            "isDeleted": false,
            "_id": "5bf542df64141e4bf907120b",
            "date": "2018-11-21T11:34:55.357Z",
            "__v": 0
        }
    ],
    "message": "Users Fetched Successfully"
}
*/

/*
// @Route: Users List
*/
namedRouter.get("user.list", '/user/list', request_param.any(), function (req, res) {

	
	userController.list(req).then(function (success) {
		res.send(success);
	}, function (failure) {
		res.send(failure);
	});


});









/*

*/

/**
 * @api {get} http://localhost:3000/api/user/edit/:id  Get User Data
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "first_name": "Andre",
    "last_name": "Jonas",
    "email": "andrew@yahoo.com",
    "phone": "9955667788",
    "password": "$2a$08$zJ5fJQDvWeHkpoJP7NCUFuWfCHeFUaAoeM9hk70bQe.L0jl6nL.by",
    "profile_pic": "",
    "status": "Inactive",
    "isDeleted": false,
    "_id": "5c0d16a7dda09809500a0333",
    "date": "2018-12-09T13:20:39.984Z",
    "__v": 0
}
*/

namedRouter.get("user.edit", '/user/edit/:id', function(req, res){
	userController.getUserById(req).then(function (success) {

		// res.status(success.status).send(success.user);

		res.status(success.status).send(success.data);

	}, function (failure) {

		res.status(failure.status).json({ "error": failure.error, "message": failure.message });

	});
});

/**
 * @api {post} http://localhost:3000/api/user/delete/:id  Delete User
 * @apiGroup Users
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
    "message": "User deleted Successfully"
}
*/

/*
// @Route: Delete User
*/

namedRouter.post('user.delete', '/user/delete/:id', request_param.any(), function (req, res) {
	userController.destroy(req).then(function (success) {

		// res.status(success.status).send(success.data);

		res.status(success.status).json({"message": success.message});


	}, function (failure) {

		res.status(failure.status).json({ "error": failure.error, "message": failure.message });

	});
});
		
/**
 * @api {post} http://localhost:3000/api/user/status-change/:id  Change User Status
 * @apiGroup Users
 * @apiHeader (Headers) {String} x-access-token Users unique access-key.
 * @apiSuccessExample {json} Success
 *{
   "message": "User status has changed successfully"
}
*/

namedRouter.post('user.status.change', '/user/status-change/:id', request_param.any(), function (req, res) {
	userController.status_change(req).then(function (success) {

		res.status(success.status).json({ "message": success.message });

	}, function (failure) {
		res.status(failure.status).json({ "error": failure.error, "message": failure.message });

	});
});

// Export the express.Router() instance
module.exports = router;
