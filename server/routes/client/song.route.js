const router = require('express').Router();

const songController = require("../../controller/client/song.controller");
const userMiddleware = require("../../middleware/user.middleware");

router.get(
  "/category-list/:slug",
  songController.listGetToCategory
)

router.get(
  "/singer-list/:slug",
  songController.listGetToSinger
)

router.get(
  "/song-list/:id",
  songController.listGetToSong
)

router.get(
  "/list",
  songController.listGet
)

router.get(
  "/detail/:id",
  songController.detailGet
)

router.post(
  "/wishlist",
  userMiddleware.verifyToken,
  songController.wishlistGet
)

router.get(
  "/random-list",
  songController.randomListGet
)

module.exports = router;