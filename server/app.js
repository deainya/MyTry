"use strict";

let express = require( "express" );
let app = express();

let configDB = require('./config/database.js');
let mongoose = require('mongoose');
let mongoUtil = require('./mongoUtil');
let passport = require('passport');
let flash    = require('connect-flash');

mongoUtil.connect();
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'thisisapartnergoappbyrfb' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.use( express.static(__dirname + "/../client") );

app.get("/tradepoints", (request, response) => {
  //response.json( ["Test3","Test4"] );
  let points = mongoUtil.tradepoints(); //Assigning tradepoints collection
  points.find().toArray((err,docs) => { //making ~select request
    if(err) { response.sendStatus(400); } //Error status
    console.log(JSON.stringify(docs)); //loging to CON
    let pointNames = docs.map((point) => point.name.concat(". ", point.address)); //mapping the Array
    response.json( pointNames );
  });
});

app.get("/partners", (request, response) => {
  let sellers = mongoUtil.partners();
  sellers.find().toArray((err,docs) => { //limit(1).next((err,doc) => {
    if(err) { response.sendStatus(400); }
    console.log(JSON.stringify(docs));
    response.json( docs );
  });
});



app.listen(3001, () => console.log( "Listening on 3001" ) );
