const router = require('express').Router();

const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");

router.use("/account", accountRoute);
router.use("/auth", authRoute);
router.use("/category", categoryRoute);

module.exports = router;