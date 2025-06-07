const router = require('express').Router();

const accountController = require("../../controller/admin/account.controller");
const accountValidate = require("../../validate/admin-account.validate");

router.post(
  "/register", 
  accountValidate.registerPost,
  accountController.registerPost
);

router.post(
  "/login",
  accountValidate.loginPost,
  accountController.loginPost
)

router.get(
  '/logout',
  accountController.logoutGet
)

module.exports = router;