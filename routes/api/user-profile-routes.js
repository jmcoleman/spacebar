///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name: api-routes.js 
//
// Description: This file offers a set of routes for displaying and saving news users
///////////////////////////////////////////////////////////////////////////////////////////////////

// Requiring our models
const db = require("../../models");

/////////////////
// Routes
/////////////////
module.exports = function(app) {

  /////////////////////////////////////////////////////////////////////////////
  // USER PUT route - update 1 user 
  /////////////////////////////////////////////////////////////////////////////
  app.put("/api/users/:id", function(req, res) {

    console.log("route: put for update user");

    // we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    db.User.findByIdAndUpdate(
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
  // USER GET route - retrieve 1 user (comments as array of objects)
  /////////////////////////////////////////////////////////////////////////////
  app.get("/api/users/:id", function(req, res) {

    console.log("route: specific user");
    // console.log(JSON.stringify(req.body));

    // get user and associated comments
    db.User.
      find({_id: req.params.id}).
      // populate('comments'). 
      exec(function (err, dbResult) {
        if (err) return handleError(err);
        console.log(dbResult);
        
        res.send(dbResult);
      });
    
  });

  ///////////////////////////////////////////////////////////////////////////
  // USER GET route - get all users (comments as objects)
  ///////////////////////////////////////////////////////////////////////////
  app.get("/api/users", function(req, res) {

    console.log("route: all users");
    // console.log(JSON.stringify(req.body));

    // get all users and associated comments
    db.User.
      find({}).
      sort({name: 'asc'}).
      // populate('comments'). 
      exec(function (err, dbResult) {
        if (err) return handleError(err);
        console.log(dbResult);
     
        res.send(dbResult);
      });

  });

  ///////////////////////////////////////////////////////////////////////////
  // USER POST route - save new user (used when not done in scrape)
  ///////////////////////////////////////////////////////////////////////////
  // app.post("/api/users", function(req, res) {

  //   console.log("route: create user");
  //   console.log(JSON.stringify(req.body));

  //   // Save a new Example using the data object
  //   db.User.create({
  //     name: req.body.name.trim(),
  //     gender: req.body.gender.trim(),
  //     birthday: req.body.birthday.trim(),
  //     location: req.body.location.trim(),
  //     photo: req.body.photo.trim(),
  //     bio: req.body.bio.trim()
  //   })
  //   .then(function(savedData) {
  //     // If saved successfully, print the new document to the console
  //     // console.log(savedData);

  //     res.send(savedData);
  //   })
  //   .catch(function(err) {
  //     // If an error occurs, log the error message
  //     console.log(err.message);
  //   });

  // });

  ///////////////////////////////////////////////////////////////////
  // USER DELETE route - delete an user
  ///////////////////////////////////////////////////////////////////
  app.delete("/api/users/:id", function(req, res) {

    console.log("route: delete a user");
    console.log(JSON.stringify(req.body));

    // remove the user
    db.User.findByIdAndRemove({ _id: req.params.id })
      .then(function(dbResult) {
        console.log("after the deletion of user: " + req.params.id);
        console.log(dbResult);

        // db.UserComment.deleteMany({ _id: { $in: dbResult.comments} }, function(err) {
        //   if (err) {
        //     return res.status(500).send(err);
        //   }

          // create object to send back a message and the id of the document that was removed
          const response = {
            message: "User successfully deleted",
            id: dbResult._id,
            title: dbResult.title,
            // comments: dbResult.comments
          };

          return res.status(200).send(response);
        // });

        // res.json(dbResult);
      })
      .catch(function(err) {
        // If an error occurs, log the error message
        console.log(err.message);
      });
  });

};

