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

router.get(
  "/list",
  singerController.listGet
)

router.patch(
  "/apply-multi",
  singerValidate.applyMultiPatch,
  singerController.applyMultiPatch
)

router.patch(
  "/delete",
  singerValidate.deletePatch,
  singerController.deletePatch
)

module.exports = router;