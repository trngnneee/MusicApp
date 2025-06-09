const Singer = require("../../model/singer.model")

module.exports.createPost = async (req, res) => {
  const numDocument = await Singer.countDocuments({});
  if (!req.body.position)
  {
    req.body.position = numDocument;
  }
  else
  {
    req.body.position = parseInt(req.body.position);
  }
  if (req.file) req.body.avatar = req.file.path;
  
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new Singer(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo ca sĩ thành công!"
  })
}