const router = require('express').Router();

const authController = require("../../controller/client/auth.controller");

router.get(
  "/verifyToken",
  authController.verifyToken
)

module.exports = router;