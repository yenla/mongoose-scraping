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


// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
	console.log("Database Error:", error);
});


// Index file
router.get("/", function(req, res){
	// res.redirect("/scrape");
	res.render("index", hbsObject);
	console.log("hit");
});

// Retrieve data from the db
router.get("/articles", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});


// Web Scraping
router.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("https://techcrunch.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".post-title").each(function(i, element) {
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");

      // If this title element had both a title and a link
      if (title && link) {
        // Save the data in the scrapedData db
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
            console.log(error);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
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