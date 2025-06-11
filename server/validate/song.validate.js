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