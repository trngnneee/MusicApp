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

module.exports = router;