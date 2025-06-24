const router = require('express').Router();

const userController = require("../../controller/client/user.controller");
const userValidate = require("../../validate/user.validate");
const userMiddleware = require("../../middleware/user.middleware");

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

router.post(
  "/forgot-password",
  userValidate.forgotPasswordPost,
  userController.forgotPasswordPost
)

router.post(
  "/otp-password",
  userValidate.otpPasswordPost,
  userController.otpPasswordPost
)

router.post(
  "/reset-password",
  userMiddleware.verifyToken,
  userValidate.resetPasswordPost,
  userController.resetPasswordPost
)

router.patch(
  "/wishlist/:id",
  userMiddleware.verifyToken,
  userController.wishlistPatch,
)

module.exports = router;