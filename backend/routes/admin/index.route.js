const router = require('express').Router();

const accountRoute = require("./account.route");
const authMiddleware = require("../../middleware/admin/auth.middleware");

router.get("/verify-token", authMiddleware.verifyToken);

router.use("/account", accountRoute);

module.exports = router;