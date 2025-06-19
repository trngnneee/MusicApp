const AdminAccount = require("../../model/admin-account.model");
const Role = require("../../model/role.model");

module.exports.userInfoGet = async (req, res) => {
  const id = req.account.id;

  const userRawInfo = await AdminAccount.findOne({
    _id: id
  })

  const userInfo = {
    fullName: userRawInfo.fullName,
    email: userRawInfo.email,
    jobPosition: userRawInfo.jobPosition,
    role: "",
    avatar: userRawInfo.avatar,
    phone: userRawInfo.phone
  }
  const roleDetail = await Role.findOne({
    _id: userRawInfo.role
  });
  userInfo.role = roleDetail.name;
  
  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    userInfo: userInfo
  })
}

module.exports.userInfoPost = async (req, res) => {
  if (req.file)
  {
    req.body.avatar = req.file.path;
  }
  else
  {
    delete req.body.avatar;
  }

  await AdminAccount.updateOne({
    _id: req.account.id
  }, req.body);
  
  res.json({
    code: "success",
    message: "Cập nhật thành công!"
  })
}