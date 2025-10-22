const router = require('express').Router();

// Main API Management Page (GET /)
router.get(
  "/",
  (req, res) => {
    const adminEndpoint = [
      {
        url: "/admin/account/register",
        method: "POST",
        desc: "Đăng ký tài khoản Admin"
      },
      {
        url: "/admin/account/login",
        method: "POST",
        desc: "Đăng nhập tài khoản Admin"
      },
      {
        url: "/admin/account/forgot-password",
        method: "POST",
        desc: "Gửi yêu cầu nhận OTP đặt lại mật khẩu"
      },
      {
        url: "/admin/account/otp-password",
        method: "POST",
        desc: "Xác thực OTP đặt lại mật khẩu"
      },
      {
        url: "/admin/account/reset-password",
        method: "POST",
        desc: "Đổi mật khẩu tài khoản Admin"
      },
      {
        url: "/admin/auth/verifyToken",
        method: "GET",
        desc: "Xác thực Access Token của tài khoản Admin"
      },
      {
        url: "/admin/category/create",
        method: "GET",
        desc: "Lấy danh sách Danh mục theo dạng cây"
      },
      {
        url: "/admin/category/create",
        method: "POST",
        desc: "Tạo mới một danh mục"
      },
      {
        url: "/admin/category/list",
        method: "GET",
        desc: "Lấy ra danh sách Danh mục với các tính năng lọc theo params"
      },
      {
        url: "/admin/category/apply-multi",
        method: "PATCH",
        desc: "Áp dụng thay đổi cho nhiều Danh mục"
      },
      {
        url: "/admin/category/delete/:id",
        method: "PATCH",
        desc: "Xóa mềm một Danh mục theo ID"
      },
      {
        url: "/admin/category/edit/:id",
        method: "GET",
        desc: "Lấy ra thông tin Danh mục theo ID"
      },
      {
        url: "/admin/category/edit/:id",
        method: "PATCH",
        desc: "Thay đổi một Danh mục theo ID"
      },
    ]

    res.render("index.pug", {
      adminEndpoint: adminEndpoint
    });
  }
)

module.exports = router;