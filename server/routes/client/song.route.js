const router = require('express').Router();

const songController = require("../../controller/client/song.controller");

router.get(
  "/category-list/:slug",
  songController.listGetToCategory
)

router.get(
  "/singer-list/:slug",
  songController.listGetToSinger
)

router.get(
  "/list",
  songController.listGet
)

module.exports = router;