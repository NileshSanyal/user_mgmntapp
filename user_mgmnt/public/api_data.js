define({ "api": [
  {
    "type": "get",
    "url": "http://localhost:3000/api/user/list",
    "title": "User List",
    "version": "1.0.0",
    "group": "Users",
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [\n        {\n            \"first_name\": \"Sam\",\n            \"last_name\": \"Jones\",\n            \"email\": \"sam@yahoo.com\",\n            \"phone\": \"7874565785\",\n            \"password\": \"$2a$08$oHNZIEHbshTk4eNC9EXtO.At6R2GAZZwTvyoj1rAm.MJd4mNCSnbS\",\n            \"profile_pic\": \"profile_pic_1542792368453_nature2.jpeg\",\n            \"status\": \"Inactive\",\n            \"isDeleted\": false,\n            \"_id\": \"5bf4ff849219352131e04e72\",\n            \"date\": \"2018-11-21T06:47:32.573Z\",\n            \"__v\": 0\n        },\n        {\n            \"first_name\": \"Charls\",\n            \"last_name\": \"Dickens\",\n            \"email\": \"charls@gmail.com\",\n            \"phone\": \"9874565554\",\n            \"password\": \"$2a$08$bhrPkLUTJi56cK8R1y9UQ.JvGINro1M3fOvLVJG/J1b.Wu5/G.AHC\",\n            \"profile_pic\": \"profile_pic_1542783278141_nature.jpeg\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"_id\": \"5bf5012e9ab22522c2578098\",\n            \"date\": \"2018-11-21T06:54:38.213Z\",\n            \"__v\": 0\n        },\n        {\n            \"first_name\": \"Samie\",\n            \"last_name\": \"Hopkins\",\n            \"email\": \"samie@yahoo.com\",\n            \"phone\": \"7874565785\",\n            \"password\": \"$2a$08$g.hHUPlyQ9J6hT00SCRo0.zzfZ.w0RP5N7M7i9ql2NjayITfsOhLO\",\n            \"profile_pic\": \"profile_pic_1542792974075_nature2.jpeg\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"_id\": \"5bf542df64141e4bf907120b\",\n            \"date\": \"2018-11-21T11:34:55.357Z\",\n            \"__v\": 0\n        }\n    ],\n    \"message\": \"Users Fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "GetHttpLocalhost3000ApiUserList"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/api/user/create",
    "title": "User Create",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "profile_pic",
            "description": "<p>User's profile picture</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"first_name\": \"Richie\",\n    \"last_name\": \"Jones\",\n    \"email\": \"richie@gmail.com\",\n    \"phone\": \"6744555694\",\n    \"password\": \"$2a$08$01m.27xMxDcd2VdCvnIZGepUzTomDaEBcnPzuwcZuRpUUyKHweEXa\",\n    \"profile_pic\": \"profile_pic_1542800095231_nature.jpeg\",\n    \"status\": \"Active\",\n    \"isDeleted\": false,\n    \"_id\": \"5bf542df64141e4bf907120b\",\n    \"date\": \"2018-11-21T11:34:55.357Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "PostHttpLocalhost3000ApiUserCreate"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/api/user/delete/:id",
    "title": "Delete User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"message\": \"User deleted Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "PostHttpLocalhost3000ApiUserDeleteId"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/api/user/edit/:id",
    "title": "Edit User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"message\": \"User Updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "PostHttpLocalhost3000ApiUserEditId"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/api/user/login",
    "title": "User Login",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjU0MmRmNjQxNDFlNGJmOTA3MTIwYiIsImlhdCI6MTU0MjgwMDkwMiwiZXhwIjoxNTQyODg3MzAyfQ.FyHVgHIk6c10Hm_hSf-yHizvkH78AxBdDiq7KOtErPo\",\n    \"message\": \"You have successfully logged in\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "PostHttpLocalhost3000ApiUserLogin"
  },
  {
    "type": "post",
    "url": "http://localhost:3000/api/user/status-change/:id",
    "title": "Change User Status",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"message\": \"User status has changed successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./app/routes/webservice/user.routes.js",
    "groupTitle": "Users",
    "name": "PostHttpLocalhost3000ApiUserStatusChangeId"
  }
] });
