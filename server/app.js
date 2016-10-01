"use strict";

let express = require( "express" );
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

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
