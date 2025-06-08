const jwt = require("jsonwebtoken");
const AdminAccount = require("../../model/admin-account.model");

module.exports.verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({
        code: "error",
        message: "Token không tồn tại!"
      });
      return;
    }

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    const existAccount = await AdminAccount.findOne({
      _id: id
    });

    if (!existAccount)
    {
      res.clearCookie();
      res.json({
        code: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
      return;
    }

    const userInfo = {
      id: existAccount.id,
      fullName: existAccount.fullName,
      email: existAccount.email
    };

    res.json({
      code: "success",
      message: "Token hợp lệ!",
      userInfo: userInfo
    })
  }
  catch (error) {
    res.clearCookie();
    res.json({
      code: "error",
      message: error
    })
  }
}