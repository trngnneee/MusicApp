const Joi = require("joi");

module.exports.websiteInfoPatch = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    phone: Joi.string()
      .required()
      .messages({
        "string.empty": "Danh mục bắt buộc!",
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": "Vui lòng nhập email!",
        "string.email": "Email không đúng định dạng!"
      }),
    address: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    avatar: Joi.string().allow(""),
    favicon: Joi.string().allow("")
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.json({
      code: "error",
      message: errorMessage
    })
    return;
  }

  next();
}