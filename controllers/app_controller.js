var express = require("express");
var router = express.Router();

// =============================================================
// Routes
// =============================================================
require("../routes/api/general-routes.js")(router);
require("../routes/api/article-routes.js")(router);
require("../routes/api/user-auth-routes.js")(router);
require("../routes/api/user-profile-routes.js")(router);
require("../routes/api/chatkit-routes.js")(router);

module.exports = router;