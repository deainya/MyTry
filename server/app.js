"use strict";

let express = require( "express" );
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use( express.static(__dirname + "/../client") );

app.get("/tradepoints", (request, response) => {
  let points = mongoUtil.tradepoints();
  points.find().toArray((err,docs) => {
    if(err) { response.sendStatus(400); }
    console.log(JSON.stringify(docs));
    let pointNames = docs.map((point) => point.name.concat(". ", point.address));
    response.json( pointNames );
  });
});

app.get("/partners", (request, response) => {
  let res = mongoUtil.partners();
  res.find().limit(1).next((err,doc) => {
    if(err) { response.sendStatus(400); }
    console.log(JSON.stringify(doc));
    response.json( doc );
  });
});

app.get("/consultant", (request, response) => {
  let res = mongoUtil.consultant();
  res.find().limit(1).next((err,doc) => {
    if(err) { response.sendStatus(400); }
    console.log(JSON.stringify(doc));
    response.json( doc );
  });
});

app.listen(3001, () => console.log( "Listening on 3001" ) );
