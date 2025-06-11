const Joi = require("joi");

module.exports.createPost = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    category: Joi.string()
      .required()
      .messages({
        "string.empty": "Danh mục bắt buộc!",
      }),
    position: Joi.string().allow(""),
    status: Joi.string().allow(""),
    lyric: Joi.string().allow(""),
    singers: Joi.string().custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return helpers.error('any.invalid');
        }
        return value;
      } catch {
        return helpers.error('any.invalid');
      }
    }).required().messages({
      'any.invalid': 'Phải chọn ít nhất 1 ca sĩ!'
    }),
    avatar: Joi.string().allow(""),
    audio: Joi.string().allow(""),
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

module.exports.applyMultiPatch = (req, res, next) => {
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

module.exports.deletePatch = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .messages({
        "string.empty": "ID áp dụng bắt buộc!",
      })
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

module.exports.editPatch = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "string.empty": "Tên bắt buộc!",
      }),
    category: Joi.string()
      .required()
      .messages({
        "string.empty": "Danh mục bắt buộc!",
      }),
    position: Joi.string().allow(""),
    status: Joi.string().allow(""),
    lyric: Joi.string().allow(""),
    singers: Joi.string().custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return helpers.error('any.invalid');
        }
        return value;
      } catch {
        return helpers.error('any.invalid');
      }
    }).required().messages({
      'any.invalid': 'Phải chọn ít nhất 1 ca sĩ!'
    }),
    avatar: Joi.string().allow(""),
    audio: Joi.string().allow(""),
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

module.exports.trashApplyMultiPatch = (req, res, next) => {
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

module.exports.recoveryPatch = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .messages({
        "string.empty": "ID áp dụng bắt buộc!",
      })
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

module.exports.hardDelete = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string()
      .required()
      .messages({
        "string.empty": "ID áp dụng bắt buộc!",
      })
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