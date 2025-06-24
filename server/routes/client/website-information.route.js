const router = require('express').Router();

const websiteInfoController = require("../../controller/client/website-information.controller");

router.get(
  "/",
  websiteInfoController.infoGet
)

module.exports = router;