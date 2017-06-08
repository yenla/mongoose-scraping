# mongoose-scraping

## Summary

Web app that lets users scrape from techcrunch website and leave comments on the latest news as well as delete them.

## Live Links

Coming Soon.

## Technologies Used

• JavaScript

• Node.js

• Express.js

• Handlebars

• Mongoose

• Body-parser

• Cheerio

• Request

• HTML

• Bootstrap

• MVC design pattern

## Execute

Follow the steps below to interact with this site locally

1. Clone this repository with git clone https://github.com/yenla/mongoose-scraping.git

2. Install modules with npm install in your terminal.

3. Run node server.js.

4. Go to localhost:3000 in your web browser to interact with the site

## Example code

• Below is example code on how to scrape articles from tech crunch

	router.get("/scrape", function(req, res, next) {

    request("https://techcrunch.com/", function(error, response, html) {
       var $ = cheerio.load(html);
       var counter = 0;
          var data = [];
          var arrLength = $(".post-title").length;
         $(".post-title").each(function(i, element) {
            var result = {};
            result.title = $(element).find("a").text();
            result.link = $(element).find("a").attr("href");
            var entry = new article(result);
            entry.save(function(err, doc) {
              if (err) {
                console.log(err);
              } else {
                // console.log(doc);
                data.push(doc);
                if (data.length == arrLength){
                  res.json(data);
                }
              }
            });
          });
    	});
	});