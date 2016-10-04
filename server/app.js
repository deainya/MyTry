"use strict";

let express = require( "express" );
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

app.get("/tradepoints", (request, response) => {
  let points = mongoUtil.tradepoints();
  points.find().toArray((err,docs) => {
    if(err) { response.sendStatus(400); }
    console.log (JSON.stringify(docs) );
    let pointNames = docs.map((point) => point.name.concat(". ", point.address));
    response.json( pointNames );
  });
});

app.get("/partners", (request, response) => {
  let seller = mongoUtil.partners();
  seller.find().limit(1).next((err,doc) => {
    if(err) { response.sendStatus(400); }
    console.log( JSON.stringify(doc) );
    response.json( doc );
  });
});

app.get("/consultant", (request, response) => {
  let consul = mongoUtil.consultant();

  consul.find().limit(1).next((err,doc) => {
    if(err) { response.sendStatus(400); }
    console.log( JSON.stringify(doc) );
    response.json( doc );
  });
});

app.get("/orders", (request, response) => {
  let orders = mongoUtil.orders();

  orders.find().toArray((err,docs) => {
    if(err) { response.sendStatus(400); }
    console.log (JSON.stringify(docs) );
    response.json( docs );
  });
});

app.post("/neworder", jsonParser, (request, response) => {
  let newOrder = request.body.order || {};
  let orders = mongoUtil.orders();

  orders.insert(newOrder, function(err, result){
    if(err) { response.sendStatus(400); }
    console.log( "Got from \"post\" method on /neworder url: " + JSON.stringify(newOrder) );
  });

  //let orders = mongoUtil.orders();
  //let query = {name: sportName};
  //let update = {$push: {goldMedals: newMedal}};

  /*sports.findOneAndUpdate(query, update, (err, res) => {
    if(err){
      response.sendStatus(400);
    }
    response.sendStatus(201);
  });*/
});



app.listen(3001, () => console.log( "Listening on 3001" ) );
