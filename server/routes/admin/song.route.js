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

router.get(
  "/list",
  songController.listGet
)

router.patch(
  "/apply-multi",
  songValidate.applyMultiPatch,
  songController.applyMultiPatch
)

router.patch(
  '/delete',
  songValidate.deletePatch,
  songController.deletePatch
)

router.get(
  "/edit/:id",
  songController.editGet
)

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songValidate.editPatch,
  songController.editPatch
)

module.exports = router;