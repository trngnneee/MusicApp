const router = require('express').Router();
const multer = require("multer");

const CloudinaryHelper = require("../../helper/cloudinay.helper");
const upload = multer({ storage: CloudinaryHelper.storage });

const settingController = require("../../controller/admin/setting.controller");
const settingValidate = require("../../validate/website-info.validate")

router.get(
  "/website-info",
  settingController.websiteInfoGet
)

router.patch(
  "/website-info",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  settingValidate.websiteInfoPatch,
  settingController.websiteInfoPatch
)

router.post(
  "/role/create",
  settingValidate.roleCreatePost,
  settingController.roleCreatePost,
)

router.get(
  "/role/list",
  settingController.roleListGet
)

router.patch(
  "/role/list/apply-multi",
  settingValidate.roleListApplyMultiPatch,
  settingController.roleListApplyMultiPatch
)

router.patch(
  "/role/list/delete",
  settingValidate.roleListDeletePatch,
  settingController.roleListDeletePatch
)

router.get(
  "/admin-account/create",
  settingController.adminAccountRoleListGet
)

router.post(
  "/admin-account/create",
  upload.single("avatar"),
  settingValidate.adminAccountCreate,
  settingController.adminAccountCreate
)

module.exports = router;