///////////////////////////////////////////////////////////////////////////////////////////////////
// File Name:   chatkit-routes.js
// Description: This file offers a set of routes for interacting with chatkit
///////////////////////////////////////////////////////////////////////////////////////////////////

// authentication
const passport = require("passport");

// pusher chatkit
const Chatkit = require("pusher-chatkit-server");

// id room instance and url
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:bf8def9e-a084-4d5d-b55c-018e22b58449",
  key:
    "e4ca655d-422d-4c06-852f-3ead9e2cd075:INafeTcxNJXMZ1VD7nkxQOLTmPnhfizwRZtcrhKjt0w=",
  url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/bf8def9e-a084-4d5d-b55c-018e22b58449/token`
});

//////////////////////////////
// Routes -- Chat
//////////////////////////////
module.exports = router => {
  //////////////////////////////////////
  // @route   POST /chat/users
  // @desc    Save a chat user
  // @access  Private
  //////////////////////////////////////
  router.post(
    "/chat/users",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const { username } = req.body;

      chatkit
        .createUser({
          id: username,
          name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
          if (error.error === "services/chatkit/user_already_exists") {
            res.sendStatus(200);
          } else {
            res.status(error.status).json(error);
          }
        });
    }
  );

  //////////////////////////////////////
  // @route   POST /chat/users
  // @desc    Authenticate a chat user
  // @access  Private
  //////////////////////////////////////
  router.post(
    "/chat/authenticate",
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const authData = chatkit.authenticate({ userId: req.query.user_id });
      res.status(authData.status).send(authData.body);
    }
  );
};
