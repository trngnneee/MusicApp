const router = require('express').Router();

const categoryRoute = require("./category.route");
const songRoute = require("./song.route");
const singerRoute = require("./singer.route");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const websiteInformationRoute = require("./website-information.route");

router.use(
  "/category", 
  categoryRoute
);

router.use(
  "/song", 
  songRoute
);

router.use(
  "/singer", 
  singerRoute
);

router.use(
  "/user", 
  userRoute
);

router.use(
  "/auth", 
  authRoute
);

router.use(
  "/website-information", 
  websiteInformationRoute
);

module.exports = router;