const router = require('express').Router();

const songController = require("../../controller/admin/song.controller");
const songValidate = require("../../validate/song.validate");

router.get(
  "/create",
  songValidate.createPost,
  songController.createPost
)

module.exports = router;