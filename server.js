// DEPENDANCIES
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// var mongojs = require("mongojs");

var request = require("request");
var cheerio = require("cheerio");
var app = express();

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve static contents
app.use(express.static(process.cwd() + "/public"));

// Express Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/webScraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Import comment and article models
var comment = require("./models/comment.js");
var article = require("./models/article.js");


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
