///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name: api-routes.js 
//
// Description: This file offers a set of routes for displaying and saving news articles
///////////////////////////////////////////////////////////////////////////////////////////////////

// Requiring our models
const db = require("../../models");

/////////////////
// Routes
/////////////////
module.exports = function(app) {

  // console.log("route called: " + app.router.getCurrentPathname());
  // console.log("route call count: " + routeCalled);

  /////////////////////////////////////////////////////////////////////////////
  // ARTICLE PUT route - update 1 article 
  /////////////////////////////////////////////////////////////////////////////
  app.put("/api/articles/:id", function(req, res) {

    console.log("route: put for update article");

    // we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    db.Article.findByIdAndUpdate(
      // the id of the item to find
      req.params.id,
      
      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      req.body,
      
      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      {new: true},
      
      // the callback function
      (err, item) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
          return res.send(item);
      }
    )
  });

  /////////////////////////////////////////////////////////////////////////////
  // ARTICLE GET route - retrieve 1 article (comments as array of objects)
  /////////////////////////////////////////////////////////////////////////////
  app.get("/api/articles/:id", function(req, res) {

    console.log("route: specific article");
    // console.log(JSON.stringify(req.body));

    // get article and associated comments
    db.Article.
      find({_id: req.params.id}).
      populate('comments'). 
      exec(function (err, dbResult) {
        if (err) return handleError(err);
        console.log(dbResult);
        
        res.send(dbResult);
      });
    
  });

  ///////////////////////////////////////////////////////////////////////////
  // ARTICLE GET route - get all articles (comments as objects)
  ///////////////////////////////////////////////////////////////////////////
  app.get("/api/articles", function(req, res) {

    console.log("route: all articles");
    // console.log(JSON.stringify(req.body));

    // get all articles and associated comments
    db.Article.
      find({}).
      sort({date: 'desc'}).
      populate('comments'). 
      exec(function (err, dbResult) {
        if (err) return handleError(err);
        // console.log(dbResult);
     
        res.send(dbResult);
      });

  });

  ///////////////////////////////////////////////////////////////////////////
  // ARTICLE POST route - save new article (used when not done in scrape)
  ///////////////////////////////////////////////////////////////////////////
  app.post("/api/articles", function(req, res) {

    console.log("route: create article");
    console.log(JSON.stringify(req.body));

    // Save a new Example using the data object
    db.Article.create({
      title: req.body.title.trim(),
      summary: req.body.summary.trim(),
      url: req.body.url.trim(),
      author: req.body.author.trim(),
      date: req.body.date
    })
    .then(function(savedData) {
      // If saved successfully, print the new document to the console
      // console.log(savedData);

      res.send(savedData);
    })
    .catch(function(err) {
      // If an error occurs, log the error message
      console.log(err.message);
    });

  });

  ///////////////////////////////////////////////////////////////////
  // ARTICLE DELETE route - delete an article
  ///////////////////////////////////////////////////////////////////
  app.delete("/api/articles/:id", function(req, res) {

    console.log("route: delete a article");
    console.log(JSON.stringify(req.body));

    // remove the article
    db.Article.findByIdAndRemove({ _id: req.params.id })
      .then(function(dbResult) {
        console.log("after the deletion of article: " + req.params.id);
        console.log(dbResult);

        db.ArticleComment.deleteMany({ _id: { $in: dbResult.comments} }, function(err) {
          if (err) {
            return res.status(500).send(err);
          }

          // create object to send back a message and the id of the document that was removed
          const response = {
            message: "Article successfully deleted",
            id: dbResult._id,
            title: dbResult.title,
            comments: dbResult.comments
          };

          return res.status(200).send(response);
        });

        // res.json(dbResult);
      })
      .catch(function(err) {
        // If an error occurs, log the error message
        console.log(err.message);
      });
  });

  //////////////////////////////////////////////////////////////////////////////
  // COMMENT POST route - save new comment and associate to an article
  //////////////////////////////////////////////////////////////////////////////
  // Route for saving a new comment to the db and associating it with a article
  app.post("/comments/:id", function(req, res) {

    var article_id = (req.params.id) ? req.params.id : req.body.id;

    // Create a new comment in the db
    db.ArticleComment.create(req.body)
      .then(function(dbComment) {
        // If a ArticleComment was created successfully, find the Article and push the new ArticleComment _id to the Articles `comments` array
        // { new: true } tells the query we want it to return the updated Article -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({_id: article_id}, { $push: { comments: dbComment._id } }, { new: true });
      })
      .then(function(dbArticle) {
        // If the User was updated successfully, send it back to the client
        res.send(dbArticle);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.send(err);
      });
  });

  ////////////////////////////////////////////////
  // COMMENT DELETE route - delete a comment
  ////////////////////////////////////////////////
  app.delete("/comments/:id", function(req, res) {

    console.log("route: delete a comment");
    console.log(JSON.stringify(req.body));

    // remove the article
    db.ArticleComment.findByIdAndRemove({ _id: req.params.id })
      .then(function(dbResult) {
        console.log("after the deletion of comment: " + req.params.id);
        console.log(dbResult);

        // create object to send back a message and the id of the document that was removed
        const response = {
          message: "Comment successfully deleted",
          id: req.params.id,
          userName: dbResult.userName,
          comment: dbResult.comment
        };
          
          return res.status(200).send(response);
      })
      .catch(function(err) {
        // If an error occurs, log the error message
        console.log(err.message);
        return res.status(500).send(err);
      });
  });
};

