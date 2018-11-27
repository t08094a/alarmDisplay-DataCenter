import express, { Router } from "express";
import { urlencoded } from "body-parser";

// add timestamps in front of log messages
require('console-stamp')(console, {pattern: 'yyyy-mm-dd HH:MM:ss.l', label: true});

// create express app
var app         =   express();
var httpServer  =   require('http').Server(app);
var router      =   Router();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({"extended" : false}));
// parse requests of content-type - application/json
app.use(express.json());

// middleware to use for all requests
router.use(function(req, res, next) {
  const origin = req.headers.origin;

  // do logging
  //console.info('incomming connection from:', origin);

  // add http headers Website you wish to allow to connect
  const whitelist = ['http://localhost:4200', 'http://alarmmonitor.local:80', 'http://alarmdisplay-datacenter:9002'];
  if(whitelist.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



// create database connection
import mongoOp from "./mongo.js";

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
app.use('/',router);

router.get("/",function(req,res){
  res.json({"message" : "hooray! welcome to our alarmmonitor-datacenter api!"});
});

require('./routes/alarm-info.routes.js')(app, httpServer);

// listen for requests
// WARNING: app.listen(3000) will NOT work here!
httpServer.listen(3000);
console.info("Listening to PORT 3000");
