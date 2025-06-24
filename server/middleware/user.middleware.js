const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      res.json({
        code: "error",
        message: "Token không tồn tại!"
      });
      return;
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    const existAccount = await User.findOne({
      _id: id,
      email: email,
      status: "active"
    });

    if (!existAccount) {
      res.clearCookie();
      res.json({
        code: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }

    req.account = existAccount;
  }
  catch (error) {
    res.clearCookie();
    res.json({
      code: "error",
      message: error
    })
    return;
  }

  next();
}