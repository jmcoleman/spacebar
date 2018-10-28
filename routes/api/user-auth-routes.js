////////////////////////////////////////////////////////////////////////////////////////////////////////
// File Name:   user-auth-routes.js
// Description: This file offers a set of routes for displaying and saving user authentication routes
////////////////////////////////////////////////////////////////////////////////////////////////////////

// authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// models
const db = require("../../models");

// gravatar
const gravatar = require("gravatar");
const keys = require("../../config/keys");

//////////////////////////////
// Routes -- User Auth
//////////////////////////////
module.exports = router => {
  //////////////////////////////
  // @route   POST /register
  // @desc    Register a user
  // @access  Public
  //////////////////////////////
  router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    db.User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        errors.email = "User already exists with this email.";
        return res.status(400).json(errors);
      }

      // get the users gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default (no profile picture)
      });

      const newUser = new db.User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        }
      });
    });
  });

  //////////////////////////////
  // @route   POST /login
  // @desc    Login a user
  // @access  Public
  //////////////////////////////
  router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    db.User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // jwt payload

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) console.error("There is some error in token", err);
              else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  });

  //////////////////////////////
  // @route   GET api/users/me
  // @desc    Return current user
  // @access  Private
  //////////////////////////////
  router.get(
    "/api/users/me",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      });
    }
  );

  //////////////////////////////
  // @route   GET /logout
  // @desc    Logout the user
  // @access  Private TODO??
  //////////////////////////////
  router.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      req.logout();
      res.redirect("/");
    }
  );
};
