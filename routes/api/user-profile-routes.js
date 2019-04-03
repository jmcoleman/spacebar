///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name:   user-profile-routes.js
// Description: This file offers a set of routes for displaying and saving user profiles
///////////////////////////////////////////////////////////////////////////////////////////////////

// authentication
const passport = require("passport");

// validations
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// models
const db = require("../../models");

//////////////////////////////
// Routes -- User Profiles
//////////////////////////////
module.exports = router => {
  /////////////////////////////////////////////
  // @route   GET /api/profile
  // @desc    Retrieve current user profile
  // @access  Private
  /////////////////////////////////////////////
  router.get(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: specific user profile");
      // console.log(JSON.stringify(req.body));

      const errors = {};

      // get user profile
      db.UserProfile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noprofile = "No profile for this user";
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );

  /////////////////////////////////////////
  // @route   GET /api/profile/handle/:handle
  // @desc    Get profile by handle
  // @access  Public
  /////////////////////////////////////////////
  router.get("/api/profile/handle/:handle", (req, res) => {
    const errors = {};

    db.UserProfile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });

  /////////////////////////////////////////
  // @route   GET /api/profile/user/:user_id
  // @desc    Get profile by id
  // @access  Public
  /////////////////////////////////////////////
  router.get("/api/profile/user/:user_id", (req, res) => {
    const errors = {};

    db.UserProfile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });

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

      // get all users and associated comments
      db.UserProfile.find({})
        .sort({ name: "asc" })
        .populate("user", ["name", "avatar"])
        .then(profiles => {
          if (!profiles) {
            errors.noprofile = "There are no profiles";
            return res.status(404).json(errors);
          }

          res.json(profiles);
        })
        .catch(err => {
          res.status(404).json({ profile: "There are no profiles" });
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

  ////////////////////////////////////////////////
  // @route   POST /api/profile
  // @desc    Save or update new user profile
  // @access  Private
  ////////////////////////////////////////////////
  router.post(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: create user profile");
      console.log(JSON.stringify(req.body));

      const { errors, isValid } = validateProfileInput(req.body);

      if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
      }

      const {
        handle,
        company,
        website,
        location,
        bio,
        gender,
        birthday,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        linkedin,
        facebook,
        instagram
      } = req.body;

      // get fields
      const profileFields = {};
      profileFields.user = req.user.id; // the logged in user (has name, email and avatar)

      if (handle) profileFields.handle = handle;
      if (company) profileFields.company = company;
      if (website) profileFields.hwebsite = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (gender) profileFields.gender = gender;
      if (birthday) profileFields.birthday = birthday;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;

      // skils - split into array
      if (typeof skills !== "undefined") {
        profileFields.skills = skills.split(",");
      }

      // social
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (facebook) profileFields.social.facebook = facebook;
      if (instagram) profileFields.social.instagram = instagram;

      db.UserProfile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            // update
            db.UserProfile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            // create
            // check if handle exists
            db.UserProfile.findOne({ handle: profileFields.handle }).then(
              profile => {
                if (profile) {
                  errors.handle = "That handle already exists";
                  res.status(400).json(errors);
                }

                // save profile
                new db.UserProfile(profileFields)
                  .save()
                  .then(profile => res.json(profile))
                  .catch(err => console.log(err));
              }
            );
          }
        })
        .catch(err => console.log(err));
    }
  );

  /////////////////////////////////////////
  // @route   DELETE /api/profile
  // @desc    Delete a user and profile
  // @access  Private
  /////////////////////////////////////////
  router.delete(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: delete a user and profile");

      // remove the user profile
      db.UserProfile.findOneAndRemove({ user: req.user.id }).then(profile => {
        console.log("after the deletion of user profile: " + req.user.id);
        console.log(profile);

        db.User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    }
  );

  /////////////////////////////////////////
  // @route   POST /api/profile/experience
  // @desc    add experience for user
  // @access  Private
  /////////////////////////////////////////
  router.post(
    "/api/profile/experience",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: create experience");
      console.log(JSON.stringify(req.body));

      const { errors, isValid } = validateExperienceInput(req.body);

      if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
      }

      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;

      db.UserProfile.findOne({ user: req.user.id })
        .then(profile => {
          const newExperience = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
          };

          // add to experiences
          profile.experience.unshift(newExperience);

          profile.save().then(profile => res.json(profile));
        })
        .catch(err => console.log(err));
    }
  );

  /////////////////////////////////////////////////////
  // @route   DELETE /api/profile/experience/:exp_id
  // @desc    Delete experience from a user profile
  // @access  Private
  /////////////////////////////////////////////////////
  router.delete(
    "/api/profile/experience/:exp_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: delete experience from a user profile");

      db.UserProfile.findOne({ user: req.user.id })
        .then(profile => {
          // get remove index
          const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

          // splice out of array
          profile.experience.splice(removeIndex, 1);

          // save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => releaseEvents.status(404).json(err));
    }
  );

  /////////////////////////////////////////
  // @route   POST /api/profile/education
  // @desc    add education for user
  // @access  Private
  /////////////////////////////////////////
  router.post(
    "/api/profile/education",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: create education");
      console.log(JSON.stringify(req.body));

      const { errors, isValid } = validateEducationInput(req.body);

      if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
      }

      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;

      db.UserProfile.findOne({ user: req.user.id })
        .then(profile => {
          const newEducation = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
          };

          // add to experiences
          profile.education.unshift(newEducation);

          profile.save().then(profile => res.json(profile));
        })
        .catch(err => console.log(err));
    }
  );

  /////////////////////////////////////////////////////
  // @route   DELETE /api/profile/education/:edu_id
  // @desc    Delete education from a user profile
  // @access  Private
  /////////////////////////////////////////////////////
  router.delete(
    "/api/profile/education/:edu_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("route: delete education from a user profile");

      db.UserProfile.findOne({ user: req.user.id })
        .then(profile => {
          // get remove index
          const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

          // splice out of array
          profile.education.splice(removeIndex, 1);

          // save
          profile.save().then(profile => res.json(profile));
        })
        .catch(err => releaseEvents.status(404).json(err));
    }
  );
};
