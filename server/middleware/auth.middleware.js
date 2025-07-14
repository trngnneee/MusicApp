const AdminAccount = require("../model/admin-account.model");
const jwt = require("jsonwebtoken");
const Role = require("../model/role.model");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.json({
        code: "error",
        message: "Token không tồn tại hoặc không đúng định dạng!"
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
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
    const roleDetail = await Role.findOne({
      _id: existAccount.role
    })
    req.account.permission = roleDetail.permissions;
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