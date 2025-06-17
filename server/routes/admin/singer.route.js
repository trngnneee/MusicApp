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
  "/delete/:id",
  singerController.deletePatch
)

router.get(
  "/trash/list",
  singerController.trashListGet
)

router.patch(
  "/trash/apply-multi",
  singerValidate.trashApplyMultiPatch,
  singerController.trashApplyMultiPatch
)

router.patch(
  "/trash/recovery/:id",
  singerController.recoveryPatch,
)

router.delete(
  "/trash/hard-delete/:id",
  singerController.hardDelete,
)

router.get(
  "/edit/:id",
  singerController.editGet
)

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  singerValidate.editPatch,
  singerController.editPatch
)

module.exports = router;