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
* Seed database with tradepoints: `mongoimport -u user -p pass --db partnergo-dev --collection tradepoints --type json --file server/json/tradepoints-seed.json --jsonArray --drop`
* Seed database with partners: `mongoimport -u user -p pass --db partnergo-dev --collection partners --type json --file server/json/partners-seed.json --jsonArray --drop`
* Seed database with consultant: `mongoimport -u user -p pass --db partnergo-dev --collection consultant --type json --file server/json/consultant-seed.json --jsonArray --drop`
* Seed database with consultant: `mongoimport -u user -p pass --db partnergo-dev --collection orders --type json --file server/json/orders-seed.json --jsonArray --drop`
