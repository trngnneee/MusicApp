const jwt = require("jsonwebtoken");
const AdminAccount = require("../../model/admin-account.model");
const Role = require("../../model/role.model");

module.exports.verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
    {
      res.json({
        code: "error",
        message: "Token không tồn tại hoặc không đúng định dạng!"
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token)
    {
      res.json({
        code: 'error',
        message: "Token không tồn tại!"
      });
      return;
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.json({
        code: "error",
        message: "Token không hợp lệ hoặc đã hết hạn!"
      });
      return;
    }

    const { id, email } = decoded;

    const existAccount = await AdminAccount.findOne({
      _id: id
    });

    if (!existAccount) {
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
    res.json({
      code: "error",
      message: "Có lỗi xảy ra khi xác thực!"
    });
  }
}