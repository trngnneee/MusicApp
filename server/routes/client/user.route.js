const router = require('express').Router();

const userController = require("../../controller/client/user.controller");
const userValidate = require("../../validate/user.validate");

router.post(
  "/register",
  userValidate.registerPost,
  userController.registerPost
)

router.post(
  "/login",
  userValidate.loginPost,
  userController.loginPost
)

router.get(
  "/logout",
  userController.logout
)

module.exports = router;