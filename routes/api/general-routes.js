///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name: html-routes.js 
//
// Description: This file offers a set of routes for sending users to the various html pages
///////////////////////////////////////////////////////////////////////////////////////////////////

const cheerio = require("cheerio");
const request = require("request");
const db = require("../../models");

const SMASHING_MAGAZINE_URL = "https://www.smashingmagazine.com";

module.exports = function(app) {

  //////////////////////
  // functions
  //////////////////////
  const scrapeSmashingMagazineSite = function (cb_loadScrapedData) {
      try {
        // First, tell the console what server.js is doing
        console.log("\n***********************************\n" +
                    "Grabbing every article name and link\n" +
                    "from Smashing Magazines's web site:" +
                    "\n***********************************\n");

        // Making a request for Smashing Magazines's web site for articles. The page's HTML is passed as the callback's third argument
        request("https://www.smashingmagazine.com/articles/", function(error, response, html) {

          if (error) {
            return console.error('Scrape from Smashing Magazine site failed: ', error);
          }

          // Load the HTML into cheerio and save it to a variable
          // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
          const $ = cheerio.load(html, { ignoreWhitespace: true });

          // An empty array to save the data that we'll scrape
          let results = [];

          ////////////////////////////////////////////////////////////////////////////////////////
          // for each article, grab info with cheerio
          ////////////////////////////////////////////////////////////////////////////////////////

          // find each "article--post" class (i: iterator. element: the current element)
          $(".article--post").each(function(i, element) {

              // Save the text of the "article--post__title" class element in a "title" variable
              var title = $(element).find(".article--post__title").text();

              // In the currently selected element, look at its child elements (i.e., its p-tags with a class "article--post__teaser"),
              // then filter for any text elements that are contents and save it to the "summary" variable
              var summary = $(element).find("p.article--post__teaser").first().contents().filter(function() {
                  return this.type === 'text';
              }).text();

              // use cheerio to scrape the html and get the author, url and date of the article
              var author = $(element).find("div.author__image").children("div").data('alt');
              var url = $(element).find(".article--post__title").children().attr("href");
              var date = $(element).find(".article--post__teaser time").attr("datetime");

              // If this found element had both a title and a link
              if (title && url) {

                // save the results in an object that we'll push into the results array that we defined earlier
                results.push({
                  title: title.trim(),
                  summary: summary.trim(),
                  url: SMASHING_MAGAZINE_URL + url.trim(),
                  author: author.trim(),
                  date: date
                });

              }
          });

          // log the results once you've looped through each of the elements found with cheerio
          // console.log("Show all scraped results >>");
          // console.log(results);

          newlyAddedArticleArray = [...results];

          // call the callback function with the result data returned from the scrape
          cb_loadScrapedData(error ? error : null, results);
        });
      }
      catch (err) {
        console.log('Scrape failed', err);
      }
  };

  const loadScrapedData = function(err,articleList) {

    console.log("loadScrapedData...");
    // console.log(JSON.stringify(articleList));

    let newArticleList = [];

    // iterate thru each article, see if it exists in MongoDB and create it if not
    articleList.forEach((item, index) => {
      // console.log("Finding: " + item.title);

      db.Article.find({title: item.title.trim()})
                .then(function(dbResult) { 
                  if (dbResult.length > 0) {
                    // console.log(`FOUND: Title '${item.title.trim()}'`); 
                  } else { 
                    // console.log(`NOT FOUND: Title '${item.title.trim()}'`); 

                    ///////////////////////////////////////////////
                    // push to Mongo DB -- we didn't find it
                    ///////////////////////////////////////////////
                    // console.log("creating NEW article from scrape");

                    // each item of the foreach that is not found, should be saved
                    db.Article.create({
                                title: item.title.trim(),
                                summary: item.summary.trim(),
                                url: item.url.trim(),                              // website url has aleady been appended at this point
                                author: item.author.trim(),
                                date: item.date
                              })
                              .then(function(savedData) {
                                // if saved successfully
                                // console.log(savedData);
                                // newArticleList.push(savedData);
                              })
                              .catch(function(err) {
                                // If an error occurs, log the error message
                                console.log("Err: " + err.message);
                              });
                  }
                })
                .catch(function(err) {
                  // If an error occurs, log the error message
                  console.log("Err: " + err.message);
                });
    });  // end foreach

  }

  //////////////////////
  // Routes 
  //////////////////////

  // GET root route
  app.get("/", function(req, res) {
    console.log("route: root");
    res.redirect("/login");
  });

  // GET scrape route to retrieve articles
  app.get("/api/scrape", function(req, res) {
    console.log("route: in scrape articles");
    
    // calls function to scrape the Smashing Magazine site, which also contains a callback function to load the data to Mongo
    scrapeSmashingMagazineSite(loadScrapedData)
    console.log("after scrape of data but just before redirect to get from the store.");
    res.redirect("/api/articles");
    // return res.status(200).send({message: "data scraped"});
  });
  
  // GET clear all articles (and their associated comments) route
  app.get("/api/articles/clear", function(req, res) {
    console.log("route: in clear all articles");

    // clear all data
    db.ArticleComment.deleteMany({}, function(err) {});
    db.Article.deleteMany({}, function(err) {});

    res.redirect("/api/articles");
  });

};
