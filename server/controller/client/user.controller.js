const User = require("../../model/user.model")
const bcrypt = require("bcryptjs");

module.exports.registerPost = async (req, res) => {
  const existAccount = await User.findOne({
    email: req.body.email
  })
  if (existAccount)
  {
    res.json({
      code: 'error',
      message: "Email đã tồn tại trong hệ thống"
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  const newRecord = new User(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo tài khoản thành công!"
  })
}