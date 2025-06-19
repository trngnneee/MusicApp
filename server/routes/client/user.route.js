const router = require('express').Router();

const userController = require("../../controller/client/user.controller");

router.post(
  "/register",
  userController.registerPost
)

module.exports = router;