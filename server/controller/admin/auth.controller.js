const jwt = require("jsonwebtoken");
const AdminAccount = require("../../model/admin-account.model");
const Role = require("../../model/role.model");

module.exports.verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({
        code: "error",
        message: "Token không tồn tại!"
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Sử dụng verify thay vì decode
    } catch (err) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      });
      return res.json({
        code: "error",
        message: "Token không hợp lệ hoặc đã hết hạn!"
      });
    }

    const { id, email } = decoded;

    const existAccount = await AdminAccount.findOne({
      _id: id
    });

    if (!existAccount) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      });
      return res.json({
        code: "error",
        message: "Tài khoản không tồn tại trong hệ thống!"
      });
    }

    const roleInfo = await Role.findOne({
      _id: existAccount.role
    });

    const userInfo = {
      id: existAccount.id,
      fullName: existAccount.fullName,
      email: existAccount.email,
      avatar: existAccount.avatar,
      role: roleInfo?.name,
      permission: roleInfo?.permissions
    };

    res.json({
      code: "success",
      message: "Token hợp lệ!",
      userInfo: userInfo
    });
  } catch (error) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });
    res.json({
      code: "error",
      message: "Có lỗi xảy ra khi xác thực!"
    });
  }
}