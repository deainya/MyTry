# MEAN Stack
* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*

# Developing

* `npm install` to resolve dependencies
* `npm install -g gulp` to install Gulp globally
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html
* Seed database with tradepoints: `mongoimport --db partnergo-dev --collection tradepoints --type json --file server/tradepoints-seed.json --jsonArray --drop`
* Seed database with partners: `mongoimport --db partnergo-dev --collection partners --type json --file server/partners-seed.json --jsonArray --drop`
