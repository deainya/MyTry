"use strict";

let express = require( "express" );
let app = express();

app.use( express.static(__dirname + "/../client") );

app.get("/tpoints", (request, response) => {
  response.json( ["Test1","Test3"] );
});

app.listen(3001, () => console.log( "Listening on 3001" ) );
