/***********************************************/
/*********** Inclusion of all modules **********/
/***********************************************/
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
//var Router = require('named-routes');
var mongoose = require('mongoose');
var session = require('express-session');
// var engine = require('ejs-locals');
var passport = require('passport');
// var flash = require('connect-flash');
var fs = require('fs');
_ = require("underscore");

require('dotenv').config();
require('mongoose-pagination');
var routeLabel = require('route-label');

var http = require('http');
/*************************************************/

/*************************************************/

var app = express();
var namedRouter = routeLabel(app);
require('app-module-path').addPath(__dirname + '/app/modules');

/***************************************************/

/*************************************************/
/********* Inclusion of all config files *********/
/*************************************************/
var dbConfig = require('./config/database');
config = require('./config/config');
utils = require('./config/utils');
auth = require('./config/auth')();
/****************************************************/
/******************** Assignments *******************/
/****************************************************/
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })); // get information from html forms
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(flash());
app.use(session({ secret: 'delivery@&beverage@#', resave: true, saveUninitialized: true }));
app.use(express.static('./public'));


app.use(function (req, res, next) {
    //backbutton prevent //
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    
    next();
});


/****************************************************/
/******************* Routes (Webservice) *****************/
/****************************************************/

fs.readdirSync('./app/routes/webservice').forEach(function (file) {
  if (file[0] == '.') return;
  namedRouter.use('', '/api', require('./app/routes/webservice/'+ file));
});

namedRouter.buildRouteTable();
routeList = namedRouter.getRouteTable();

console.log('Route list: ', routeList);

// console.log('Route table:', namedRouter.getRouteTable());
generateUrl = function (route_name, route_param = {}) { return namedRouter.urlFor(route_name, route_param) }


/****************************************************/
/******************* Service Launch *****************/
/****************************************************/
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    //console.log(error);
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        server.close();
        //process.exit(1);
        break;
      default:
        throw error;
    }
  }
var port = process.env.NODE_ENV == 'dev' ? process.env.DEV_PORT : process.env.NODE_ENV == 'dev1' ? process.env.DEV_PORT_1 : process.env.PORT;
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
console.log('user_mgmnt is running on port ' + port);
/****************************************************/