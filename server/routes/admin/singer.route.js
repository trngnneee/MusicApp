const router = require('express').Router();
const multer = require("multer");

const CloudinaryHelper = require("../../helper/cloudinay.helper");
const upload = multer({ storage: CloudinaryHelper.storage });

const singerController = require("../../controller/admin/singer.controller");
const singerValidate = require("../../validate/singer.validate");
const adminMiddleware = require("../../middleware/auth.middleware");

router.post(
  "/create",
  upload.single("avatar"),
  singerValidate.createPost,
  adminMiddleware.verifyToken,
  singerController.createPost
)

router.get(
  "/list",
  singerController.listGet
)

router.patch(
  "/apply-multi",
  singerValidate.applyMultiPatch,
  adminMiddleware.verifyToken,
  singerController.applyMultiPatch
)

router.patch(
  "/delete/:id",
  adminMiddleware.verifyToken,
  singerController.deletePatch
)

router.get(
  "/trash/list",
  singerController.trashListGet
)

router.patch(
  "/trash/apply-multi",
  singerValidate.trashApplyMultiPatch,
  adminMiddleware.verifyToken,
  singerController.trashApplyMultiPatch
)

router.patch(
  "/trash/recovery/:id",
  adminMiddleware.verifyToken,
  singerController.recoveryPatch,
)

router.delete(
  "/trash/hard-delete/:id",
  adminMiddleware.verifyToken,
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
  adminMiddleware.verifyToken,
  singerController.editPatch
)

module.exports = router;