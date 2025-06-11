const router = require('express').Router();
const multer = require("multer");
const CloudinaryHelper = require("../../helper/cloudinay.helper")

const upload = multer({ storage: CloudinaryHelper.storage });

const songController = require("../../controller/admin/song.controller");
const songValidate = require("../../validate/song.validate");

router.get(
  "/create",
  songController.createGet
)

router.post(
  "/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  songValidate.createPost,
  songController.createPost
)

module.exports = router;