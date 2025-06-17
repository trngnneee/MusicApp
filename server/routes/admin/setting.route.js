const router = require('express').Router();
const multer = require("multer");

const CloudinaryHelper = require("../../helper/cloudinay.helper");
const upload = multer({ storage: CloudinaryHelper.storage });

const settingController = require("../../controller/admin/setting.controller");
const settingValidate = require("../../validate/setting.validate")

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
  "/role/apply-multi",
  settingValidate.roleListApplyMultiPatch,
  settingController.roleListApplyMultiPatch
)

router.patch(
  "/role/delete/:id",
  settingController.roleListDeletePatch
)

router.get(
  "/role/edit/:id",
  settingController.roleEditGet
)

router.patch(
  "/role/edit/:id",
  settingValidate.roleEditPatch,
  settingController.roleEditPatch
)

router.get(
  "/role/trash/list",
  settingController.roleTrashGet
)

router.delete(
  "/role/trash/hard-delete/:id",
  settingController.roleTrashHardDelete
)

router.patch(
  "/role/trash/recovery/:id",
  settingController.roleTrashRecoveryPatch
)

router.patch(
  "/role/trash/apply-multi",
  settingValidate.roleTrashApplyMulti,
  settingController.roleTrashApplyMulti,
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

router.get(
  "/admin-account/list",
  settingController.adminAccountListGet
)

router.patch(
  "/admin-account/apply-multi",
  settingValidate.adminAccountApplyMulti,
  settingController.adminAccountApplyMulti
)

router.patch(
  "/admin-account/delete/:id",
  settingController.adminAccountDeletePatch
)

router.get(
  "/admin-account/edit/:id",
  settingController.adminAccountEditGet
)

router.patch(
  "/admin-account/edit/:id",
  upload.single("avatar"),
  settingValidate.adminAccountEdit,
  settingController.adminAccountEdit
)

router.get(
  "/admin-account/trash",
  settingController.trashListGet
)

router.patch(
  "/admin-account/trash/apply-multi",
  settingValidate.trashApplyMulti,
  settingController.trashApplyMulti
)

router.delete(
  "/admin-account/trash/hard-delete/:id",
  settingController.trashHardDelete
)

router.patch(
  "/admin-account/trash/recovery/:id",
  settingController.trashRecoveryPatch
)

module.exports = router;