const router = require('express').Router();

const singerController = require("../../controller/client/singer.controller");

router.get(
  "/list",
  singerController.listGet
)

router.get(
  "/detail/:slug",
  singerController.detailGet
)

module.exports = router;