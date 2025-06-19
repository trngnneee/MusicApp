const Joi = require("joi");

module.exports.userInfoPost = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    phone: Joi.string()
      .required()
      .messages({
        "string.empty": "Số điện thoại bắt buộc!",
      }),
    avatar: Joi.string().allow(""),
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