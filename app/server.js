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
  next(); // make sure we go to the next routes and don't stop here
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
