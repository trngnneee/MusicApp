const router = require('express').Router();

const categoryRoute = require("./category.route");
const songRoute = require("./song.route");
const singerRoute = require("./singer.route");

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

module.exports = router;