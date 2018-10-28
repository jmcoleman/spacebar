///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name:   user-profile-routes.js
// Description: This file offers a set of routes for displaying and saving user profiles
///////////////////////////////////////////////////////////////////////////////////////////////////

// authentication
const passport = require("passport");

// models
const db = require("../../models");

//////////////////////////////
// Routes -- User Profiles
//////////////////////////////
module.exports = router => {
  //////////////////////////////////////
  // @route   GET /api/profiles/:id
  // @desc    Retrieve a user profile
  // @access  Private
  //////////////////////////////////////
  router.get(
    "/api/profiles/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: specific user profile");
      // console.log(JSON.stringify(req.body));

      // get user profile
      db.UserProfile.find({ _id: req.params.id })
        // populate('comments').
        .exec(function(err, dbResult) {
          if (err) return handleError(err);
          console.log(dbResult);

          res.send(dbResult);
        });
    }
  );

  /////////////////////////////////////////
  // @route   GET /api/profiles
  // @desc    Retrieve all user profiles
  // @access  Private
  /////////////////////////////////////////
  router.get(
    "/api/profiles",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: all users");
      // console.log(JSON.stringify(req.body));

      // get all users and associated comments
      db.User.find({})
        .sort({ name: "asc" })
        // populate('comments').
        .exec(function(err, dbResult) {
          if (err) return handleError(err);
          console.log(dbResult);

          res.send(dbResult);
        });
    }
  );

  //////////////////////////////////////
  // @route   PUT /api/profiles/:id
  // @desc    Update a user profile
  // @access  Private
  //////////////////////////////////////
  router.put(
    "/api/profiles/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: put for update user profile");

      // we're updating an existing document, hence the req.params.todoId.
      // Find the existing resource by ID
      db.UserProfile.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, item) => {
          // Handle any possible database errors
          if (err) return res.status(500).send(err);
          return res.send(item);
        }
      );
    }
  );

  /////////////////////////////////////////
  // @route   POST /api/profiles
  // @desc    Save new user profile
  // @access  Private
  /////////////////////////////////////////
  router.post(
    "/api/profiles",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: create user profile");
      console.log(JSON.stringify(req.body));

      // save new
      db.UserProfile.create({
        name: req.body.name.trim(),
        gender: req.body.gender.trim(),
        birthday: req.body.birthday.trim(),
        location: req.body.location.trim(),
        photo: req.body.photo.trim(),
        bio: req.body.bio.trim()
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
    }
  );

  /////////////////////////////////////////
  // @route   DELETE /api/profiles/:id
  // @desc    Delete a user profile
  // @access  Private
  /////////////////////////////////////////
  router.delete(
    "/api/profiles/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: delete a user profile");
      console.log(JSON.stringify(req.body));

      // remove the user profile
      db.UserProfile.findByIdAndRemove({ _id: req.params.id })
        .then(function(dbResult) {
          console.log("after the deletion of user profile: " + req.params.id);
          console.log(dbResult);

          // db.UserComment.deleteMany({ _id: { $in: dbResult.comments} }, function(err) {
          //   if (err) {
          //     return res.status(500).send(err);
          //   }

          // create object to send back a message and the id of the document that was removed
          const response = {
            message: "User Profile successfully deleted",
            id: dbResult._id,
            title: dbResult.title
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
    }
  );
};
