const router = require('express').Router();
const multer = require("multer");
const CloudinaryHelper = require("../../helper/cloudinay.helper")

const upload = multer({ storage: CloudinaryHelper.storage });

const categoryController = require("../../controller/admin/category.controller");
const categoryValidate = require("../../validate/category.validate");
const adminMiddleware = require("../../middleware/auth.middleware");

router.get(
  "/create",
  categoryController.createGet
)

router.post(
  "/create", 
  upload.single("avatar"),
  categoryValidate.createPost,
  adminMiddleware.verifyToken,
  categoryController.createPost
);

router.get(
  "/list",
  categoryController.listGet
)

router.patch(
  "/apply-multi",
  categoryValidate.applyMultiPatch,
  adminMiddleware.verifyToken,
  categoryController.applyMultiPatch
)

router.patch(
  "/delete/:id",
  adminMiddleware.verifyToken,
  categoryController.deletePatch
)

router.get(
  "/edit/:id",
  categoryController.editGet
)

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  categoryValidate.editPatch,
  adminMiddleware.verifyToken,
  categoryController.editPatch
)

router.get(
  "/trash/list",
  categoryController.trashGet
)

router.patch(
  "/trash/apply-multi",
  categoryValidate.trashApplyMultiPatch,
  adminMiddleware.verifyToken,
  categoryController.trashApplyMultiPatch
)

router.patch(
  "/trash/recovery/:id",
  adminMiddleware.verifyToken,
  categoryController.recoveryPatch,
)

router.delete(
  "/trash/hard-delete/:id",
  adminMiddleware.verifyToken,
  categoryController.hardDelete
)

module.exports = router;