const router = require('express').Router();

const playListController = require("../../controller/client/playlist.controller");

const userValidateMiddleware = require("../../middleware/user.middleware");

router.post(
  "/create",
  userValidateMiddleware.verifyToken,
  playListController.playlistCreatePost
)

router.get(
  "/",
  userValidateMiddleware.verifyToken,
  playListController.playlistGet
)

router.patch(
  "/add",
  userValidateMiddleware.verifyToken,
  playListController.playlistAddPatch
)

module.exports = router;