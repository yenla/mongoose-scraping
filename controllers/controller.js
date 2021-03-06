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

// Index file
router.get("/", function(req, res){
	// res.redirect("/scrape");

  article.find({}, function(error, docs) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
    	// console.log(docs);
      // res.json(doc);
		res.render('index', {
			// articles: [
			// 	{ 
			// 		title: 'value',
			// 		summary: 'value',
			// 		link: 'value'
			// 	}
			// ]
			articles: docs
		});
    }
  });
	// console.log("hit");
	// res.send('ok');
});

// Web Scraping
router.get("/scrape", function(req, res, next) {
  // Make a request for the news section of combinator
    request("https://techcrunch.com/", function(error, response, html) {
       var $ = cheerio.load(html);
       var counter = 0;
          var data = [];
          var arrLength = $(".river-block").length;
         $(".river-block").each(function(i, element) {
            var result = {};

            // Collect the Article Title
            var title = $(element).find("a").text();
            result.title = title.substr(0, title.length - 9) + ' Read More';
           	
           	// Collect the Article Link
            result.link = $(element).find("a").attr("href");
            
			// Collect the Article Summary
            var summary = $(element).find("p").text();
            result.summary = summary.substr(0, summary.length - 10);
            var entry = new article(result);
            entry.save(function(err, doc) {
              if (err) {
                console.log(err);
              } else {
                // console.log(doc);
                data.push(doc);
                if (data.length == arrLength){
                  // res.json(data);
                  article.find({}, function(err, docs){
    				if (err){
    					console.log(err);
    				} else {
	                  res.render('index', {
	                  	articles: docs
	                  })
    				}           	

                  }) // closes article.find
                } // closes if
              }
            }); // closes save
          }); // this closes the .each
    }); // this closes request

}); // this closes the get route

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

	var newComment = new comment(result);

	newComment.save(function(err, docs) {
		if (error) {
			console.log(err);
		}
		else {
			article.findOneAndUpdate({"_id": articleId}, {$push:{"comments": docs.id}},{new: true})
			.exec(function(err, docs){
				if (err){
					console.log(err);
				} else {
					res.send(docs);
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
			res.send(result);
		}
	});
});

// Export router
module.exports = router;