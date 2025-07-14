const router = require('express').Router();

const accountController = require("../../controller/admin/account.controller");
const accountValidate = require("../../validate/admin-account.validate");
const authMiddleware = require("../../middleware/auth.middleware");

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

router.post(
  '/forgot-password',
  accountValidate.forgotPasswordPost,
  accountController.forgotPasswordPost
)

router.post(
  "/otp-password",
  accountValidate.otpPasswordPost,
  accountController.otpPasswordPost
)

router.post(
  '/reset-password',
  authMiddleware.verifyToken,
  accountValidate.resetPasswordPost,
  accountController.resetPasswordPost
)

module.exports = router;