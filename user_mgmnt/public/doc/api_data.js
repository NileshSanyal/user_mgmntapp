define({ "api": [
  {
    "type": "get",
    "url": "/customer/:id",
    "title": "Customer details",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>customer id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"email\": \"test9@mail.com\",\n        \"password\": \"\",\n        \"name\": \"Test customer\",\n        \"contact\": \"\",\n        \"address\": \"\",\n        \"city\": \"\",\n        \"state\": \"\",\n        \"zip\": \"\",\n        \"latitude\": \"\",\n        \"longitude\": \"\",\n        \"profile_image\": \"profile_image_1524840626303_TalpaGrow.jpg\",\n        \"shop_title\": \"\",\n        \"device_token\": \"\",\n        \"device_type\": \"\",\n        \"google_auth_key\": \"12345678\",\n        \"facebook_auth_key\": \"\",\n        \"regType\": \"google\",\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"createdAt\": \"2018-04-27T14:50:26.447Z\",\n        \"_id\": \"5addd499022844523b857730\",\n        \"first_name\": \"eeeee\",\n        \"last_name\": \"\",\n        \"__v\": 0\n    },\n    \"message\": \"Data Updated Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/webservice/customer/customer.routes.js",
    "groupTitle": "Customers",
    "name": "GetCustomerId"
  },
  {
    "type": "post",
    "url": "/customer/login",
    "title": "Customer login",
    "group": "Customers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>customer email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>customer password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "device_token",
            "description": "<p>customer device token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "device_type",
            "defaultValue": "ios,android",
            "description": "<p>customer device type</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYTkxYjI3ZGQyNmRlNGFlY2FjM2I2YiIsImlhdCI6MTUyNDg0MDYxNCwiZXhwIjoxNTI0OTI3MDE0fQ.eYhqCB5bUHVginlRw_3nEV-tAccMm-4aCOV2yM-ZRAs\",\n    \"data\": {\n        \"email\": \"mike.herry@email.com\",\n        \"password\": \"$2a$08$SY52htlg0lnzRgVd/euphuihnJ5GwMgZeCvTrrv1/NkVlEdNBlvMu\",\n        \"name\": \"Customer003\",\n        \"contact\": \"9876543210\",\n        \"address\": \"Boston\",\n        \"city\": \"\",\n        \"state\": \"\",\n        \"zip\": \"\",\n        \"latitude\": \"\",\n        \"longitude\": \"\",\n        \"profile_image\": \"profile_image_1523875734262_Screenshot_2018-03-13-12-33-38-662_com.smartwallpaper.png\",\n        \"shop_title\": \"\",\n        \"device_token\": \"12345678\",\n        \"device_type\": \"ios\",\n        \"google_auth_key\": \"\",\n        \"facebook_auth_key\": \"\",\n        \"regType\": \"normal\",\n        \"isDeleted\": false,\n        \"isActive\": true,\n        \"createdAt\": \"2018-04-27T14:50:14.428Z\",\n        \"_id\": \"5aa91b27dd26de4aecac3b6b\",\n        \"first_name\": \"Mike\",\n        \"last_name\": \"Herry\",\n        \"role\": \"5a5dc852b8468e1d38c81c0f\",\n        \"__v\": 0\n    },\n    \"message\": \"You have successfully logged in\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/webservice/customer/customer.routes.js",
    "groupTitle": "Customers",
    "name": "PostCustomerLogin"
  }
] });
