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

module.exports.roleCreatePost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    description: Joi.string().allow(""),
    permissions: Joi.array().allow("")
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

module.exports.roleListApplyMultiPatch = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .messages({
        "string.empty": "Trạng thái áp dụng bắt buộc!",
      }),
    idList: Joi.array()
      .required()
      .messages({
        "string.empty": "Danh sách phần tử cần áp dụng bắt buộc!",
      }),
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

module.exports.roleListDeletePatch = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .messages({
        "string.empty": "ID bắt buộc!",
      }),
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