const router = require('express').Router();

const authController = require("../../controller/admin/auth.controller");

router.get(
  "/verifyToken",
  authController.verifyToken
)

module.exports = router;