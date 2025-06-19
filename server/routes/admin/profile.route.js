const router = require('express').Router();

const profileController = require("../../controller/admin/profile.controller");
const profileValidate = require("../../validate/profile.validate");

const multer = require("multer")
const cloudinaryHelper = require("../../helper/cloudinay.helper")
const upload = multer({ storage: cloudinaryHelper.storage })

router.get(
  "/",
  profileController.userInfoGet
)

router.post(
  "/",
  upload.single("avatar"),
  profileValidate.userInfoPost,
  profileController.userInfoPost
)

module.exports = router;