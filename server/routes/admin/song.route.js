const router = require('express').Router();
const multer = require("multer");
const CloudinaryHelper = require("../../helper/cloudinay.helper")

const upload = multer({ storage: CloudinaryHelper.storage });

const songController = require("../../controller/admin/song.controller");
const songValidate = require("../../validate/song.validate");
const adminMiddleware = require("../../middleware/auth.middleware");

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
  adminMiddleware.verifyToken,
  songController.createPost
)

router.get(
  "/list",
  songController.listGet
)

router.patch(
  "/apply-multi",
  songValidate.applyMultiPatch,
  adminMiddleware.verifyToken,
  songController.applyMultiPatch
)

router.patch(
  '/delete/:id',
  adminMiddleware.verifyToken,
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
  adminMiddleware.verifyToken,
  songController.editPatch
)

router.get(
  "/trash/list",
  songController.trashListGet
)

router.patch(
  "/trash/apply-multi",
  songValidate.trashApplyMultiPatch,
  adminMiddleware.verifyToken,
  songController.trashApplyMultiPatch,
)

router.patch(
  "/trash/recovery/:id",
  adminMiddleware.verifyToken,
  songController.recoveryPatch,
)

router.delete(
  "/trash/hard-delete/:id",
  adminMiddleware.verifyToken,
  songController.hardDelete,
)

module.exports = router;