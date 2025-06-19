const router = require('express').Router();

const categoryController = require("../../controller/client/category.controller");

router.get(
  "/list",
  categoryController.listGet
)

router.get(
  "/detail/:slug",
  categoryController.detailGet
)

module.exports = router;