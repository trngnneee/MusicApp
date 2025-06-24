const User = require("../../model/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

module.exports.registerPost = async (req, res) => {
  const existAccount = await User.findOne({
    email: req.body.email
  })
  if (existAccount) {
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

module.exports.loginPost = async (req, res) => {
  const existAccount = await User.findOne({
    email: req.body.email
  })
  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  if (!bcrypt.compareSync(req.body.password, existAccount.password)) {
    res.json({
      code: "error",
      message: "Mật khẩu không chính xác!"
    });
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: req.body.rememberPassword == true ? '30d' : '1d'
    }
  );

  res.cookie("userToken", token, {
    maxAge: req.body.rememberPassword == true ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax"
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!"
  })
}

module.exports.logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({
    code: "success",
    message: "Đăng xuất thành công!"
  })
}