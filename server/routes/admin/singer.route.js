const router = require('express').Router();
const multer = require("multer");

const CloudinaryHelper = require("../../helper/cloudinay.helper");
const upload = multer({ storage: CloudinaryHelper.storage });

const singerController = require("../../controller/admin/singer.controller");
const singerValidate = require("../../validate/singer.validate");

router.post(
  "/create",
  upload.single("avatar"),
  singerValidate.createPost,
  singerController.createPost
)

module.exports = router;