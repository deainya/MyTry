"use strict";

let express = require( "express" );
let app = express();

app.use( express.static(__dirname + "/../client") );

app.get("/tradepoints", (request, response) => {
  response.json( ["Test3","Test4"] );
});

app.listen(3001, () => console.log( "Listening on 3001" ) );
