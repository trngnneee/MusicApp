const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {

  const token = req.cookie.token;
  console.log(token);
  // if (!token)
  // {
  //   res.redirect("/admin/account/login");
  //   return;
  // }

  // try
  // {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);
  // }
  // catch(error)
  // {
  //   res.clearCookies("token");
  //   res.redirect(`/admin/account/login`);
  // }
}