const router = require('express').Router();

const accountRoute = require("./account.route");

router.use("/account", accountRoute);

module.exports = router;