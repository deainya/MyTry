"use strict";

let mongo = require('mongodb');
let client = mongo.MongoClient;
let _db;

module.exports = {
  connect() {
    client.connect('mongodb://user:pass@localhost:27017/partnergo-dev', (err, db) => {
      if(err) {
        console.log("Error connecting to Mongo - check mongod connection");
        process.exit(1);
      }
      _db = db;
      console.log("Connected to Mongo");
    });
  },
  tradepoints(){
    return _db.collection('tradepoints');
  }
}
