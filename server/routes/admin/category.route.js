const router = require('express').Router();
const multer = require("multer");
const CloudinaryHelper = require("../../helper/cloudinay.helper")

const upload = multer({ storage: CloudinaryHelper.storage });

const categoryController = require("../../controller/admin/category.controller");
const categoryValidate = require("../../validate/category.validate");

router.get(
  "/create",
  categoryController.createGet
)

router.post(
  "/create", 
  upload.single("avatar"),
  categoryValidate.createPost,
  categoryController.createPost
);

router.get(
  "/list",
  categoryController.listGet
)

router.patch(
  "/apply-multi",
  categoryValidate.applyMultiPatch,
  categoryController.applyMultiPatch
)

router.patch(
  "/delete/:id",
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
  categoryController.editPatch
)

router.get(
  "/trash/list",
  categoryController.trashGet
)

router.patch(
  "/trash/apply-multi",
  categoryValidate.trashApplyMultiPatch,
  categoryController.trashApplyMultiPatch
)

router.patch(
  "/trash/recovery",
  categoryValidate.recoveryPatch,
  categoryController.recoveryPatch,
)

router.delete(
  "/trash/hard-delete/:id",
  categoryController.hardDelete
)

module.exports = router;