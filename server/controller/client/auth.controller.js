const jwt = require("jsonwebtoken");
const User = require("../../model/user.model");

module.exports.verifyToken = async (req, res) => {
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
      _id: id
    });

    if (!existAccount) {
      res.clearCookie("userToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      });
      res.json({
        code: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }

    const userInfo = {
      id: existAccount.id,
      fullName: existAccount.fullName,
      email: existAccount.email,
      wishlist: existAccount.wishlist
    };

    res.json({
      code: "success",
      message: "Token hợp lệ!",
      userInfo: userInfo
    })
  }
  catch (error) {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });
    res.json({
      code: "error",
      message: error
    })
  }
}