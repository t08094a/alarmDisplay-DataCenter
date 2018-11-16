import express, { Router } from "express";
import { urlencoded, json } from "body-parser";

// create express app
var app         =   express();
var router      =   Router();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({"extended" : false}));
// parse requests of content-type - application/json
app.use(express.json());

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');

  // add http headers
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:4200', 'http://datacenter-app:9001', 'http://datacenter-app:80']);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

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
  res.json({
    "message" : "hooray! welcome to our alarmmonitor-datacenter api!"
  });
});

require('./routes/alarm-info.routes.js')(app);

// listen for requests
app.listen(3000);
console.log("Listening to PORT 3000");
