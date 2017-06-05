// DEPENDANCIES
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio");
var app = express();


// Serve static contents
app.use(express.static(process.cwd() + "/public"));

// Express Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
// 	console.log("Database Error:", error);
// });

// Import Routes and Controller
var routes = require("./controllers/controller.js");
app.use('/', routes);


// // Retrieve data from the db
// app.get("/articles", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as a json
//     else {
//       res.json(found);
//     }
//   });
// });


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Listening on PORT " + PORT);
});
