const router = require('express').Router();
const multer = require("multer");
const CloudinaryHelper = require("../../helper/cloudinay.helper")

const upload = multer({ storage: CloudinaryHelper.storage });

const categoryController = require("../../controller/admin/category.controller");
const categoryValidate = require("../../validate/category.validate");
const authMiddleware = require("../../middleware/auth.middleware");

router.get(
  "/create",
  categoryController.createGet
)

router.post(
  "/create", 
  upload.single("avatar"),
  authMiddleware.verifyToken,
  categoryValidate.createPost,
  categoryController.createPost
);

module.exports = router;