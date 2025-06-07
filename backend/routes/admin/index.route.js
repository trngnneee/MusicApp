const router = require('express').Router();

const accountRoute = require("./account.route");
const authRoute = require("./auth.route");

router.use("/account", accountRoute);
router.use("/auth", authRoute);

module.exports = router;