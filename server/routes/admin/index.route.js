const router = require('express').Router();

const authMiddleware = require("../../middleware/auth.middleware");

const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");
const singerRoute = require("./singer.route");
const songRoute = require("./song.route");
const settingRoute = require("./setting.route");

router.use(
  "/account", 
  accountRoute
);

router.use(
  "/auth", 
  authRoute
);

router.use(
  "/category",
  authMiddleware.verifyToken, 
  categoryRoute
);

router.use(
  "/singer",
  authMiddleware.verifyToken, 
  singerRoute
);

router.use(
  "/song",
  authMiddleware.verifyToken, 
  songRoute
);

router.use(
  "/setting",
  authMiddleware.verifyToken, 
  settingRoute
);

module.exports = router;