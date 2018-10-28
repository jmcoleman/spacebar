/////////////////////////////////////////////////////////
// handle environment variables
/////////////////////////////////////////////////////////

// use dotenv to read .env vars into Node but silence the Heroku log error for production as no .env will exist
require('dotenv').config( );

// process.env.NODE_ENV is set by heroku with a default value of production
if (process.env.NODE_ENV === 'production') {
    console.log("in PROD");
    // connect to the MongoDB on heroku using MONGODB_URI below
  } else {
    console.log("in DEV");
    // use the connection info from the .env file otherwise
    require('dotenv').load();
  }

//////////////////////////
// dependencies
//////////////////////////
const mongoose = require("mongoose");
const express = require('express');
const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const passport = require('passport');

// const dbConnection = require("./models");

///////////////////////
// configure Express
///////////////////////
const app = express();
// app.use(express.json());

const port = process.env.PORT || 5000;

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static folders
app.use(express.static(__dirname + '/public'));

/////////////////////////
// connect to Mongo DB
/////////////////////////
// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/thespacebar";

// Set mongoose to leverage built in JavaScript ES6 Promises and connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

/////////////////////
// Expess Session
/////////////////////

const MongoStore = require('connect-mongo')(session)
app.use(session({
    secret: process.env.SECRET_KEY,     // put this in the heroku environment variables
    // saveUninitialized: true,
    // resave: true
    // store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  }));

//////////////////////
// enable CORS
//////////////////////

// CORS / Chat-Kit
const cors = require('cors');
app.use(cors())

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
});

////////////////////////////////
// console log all routes
////////////////////////////////
app.use('/', function (req, res, next) {
  console.log("----------------------------");
  console.log("Original Url: " + req.originalUrl);
  console.log("Base Url: " + req.baseUrl);
  console.log("Path: " + req.path);
  console.log("----------------------------");
  next();
});

////////////////////////////////
//auth required or redirect
////////////////////////////////
// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next();
// });

//  app.use('/api', function(req, res, next) {
//   if ( !req.session.user ) {
//     res.redirect('/login?ref='+req.path);
//   } else {
//     next();
//   }
// });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

////////////////////////////////////////////////////////
// Import routes and give the server access to them.
////////////////////////////////////////////////////////
var routes = require("./controllers/app_controller.js");
app.use(routes);

//////////////////////
// initial test route
//////////////////////
// app.get('/api/test', (req, res) => {
//     res.send({ express: 'Hello From Express!!' });
//   });
  
/////////////////////////////////////
// handle production environment
/////////////////////////////////////
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        console.log("no route hit");
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
} else {

    //////////////////////////////////////////////////////////
    //default for when no other route is hit.  Must be last
    //////////////////////////////////////////////////////////
    app.get('*', (req, res) => {
        console.log("no route hit");
        res.send({ express: 'Hello - No route was hit' });
    })
}

// listen for request
app.listen(port, () => console.log(`Listening on port ${port}`));

