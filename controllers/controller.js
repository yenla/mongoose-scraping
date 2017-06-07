// DEPENDANCIES
var express = require("express");
var router = express.Router();
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");

var mongojs = require("mongojs");

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];


// Import comment and article models
var comment = require("../models/comment.js");
var article = require("../models/article.js");


// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
// 	console.log("Database Error:", error);
// });


// Index file
router.get("/", function(req, res){
	// res.redirect("/scrape");
	console.log("hit");
	// res.send('ok');
	res.render('index', {
		articles: [
			{ 
				title: 'value',
				summary: 'value',
				link: 'value'

			}
		]
	});
});


// Web Scraping
router.get("/scrape", function(req, res, next) {
  // Make a request for the news section of ycombinator

  var requestPromise = new Promise(function(resolve, reject){

  request("https://techcrunch.com/", function(error, response, html) {
  	// console.log(html);
	var data = [];
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".post-title").each(function(i, element) {

    	var result = {};
      	// Save the text of each link enclosed in the current element
    	result.title = $(element).find("a").text();

      	// Save the href value of each link enclosed in the current element
      	result.link = $(element).find("a").attr("href");

      	// Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new article(result);
      // Now, save that entry to the db

      entry.save(function(err, doc) {
      	// Log error
      	if (err) {
      		console.log(err);
      	}
      	// Or log the doc
      	else {
      		console.log(doc);
      		res.json(doc);
      		data.push(doc);
      	}

      }); // closes save

	}); // this closes the  each 

    resolve(data);
  }); // this closes request

	}); // this closes the promise


  	requestPromise.then(function(data){
  		console.log('this is the data');
  		console.log(data);
	  res.send(data);
  });

  // This will send a "Scrape Complete" message to the browser
});

router.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


// Add a Routing Comment

router.post("/add/comment/:id", function (req, res) {

	var articleId = req.params.id;

	var commentAuthor = req.body.name;

	var commentBody = req.body.comment;

	var result = {
		author: commentAuthor,
		body: commentBody
	}

	var entry = new comment (result);

	entry.save(function(err, docs) {
		if (error) {
			console.log(err);
		}
		else {
			article.findOneAndUpdate({"_id": articleId}, {$push:{"comments": docs.id}},{new: true})
			.exec(function(err, docs){
				if (err){
					console.log(err);
				} else {
					res.sendStatus('Success');
				}
			});
		}
	});	
});

// Delete a Rounting Comment
router.post("/remove/comment/:id", function(req, res){
	var commentId = req.params.id;
	comment.findIdandRemove(commentId, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.sendStatus('Complete');
		}
	});
});

// Export router
module.exports = router;