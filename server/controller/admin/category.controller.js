const Category = require("../../model/category.model");
const categoryHelper = require("../../helper/category.helper");

module.exports.createGet = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false
  });

  const categoryTree = categoryHelper.categoryTreeBuild(categoryList);

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    categoryTree: categoryTree
  })
}

module.exports.createPost = async (req, res) => {
  const documentNum = await Category.countDocuments({
    deleted: false
  });

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  }
  else {
    req.body.position = documentNum + 1;
  }

  req.body.avatar = req.file.path;
  
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new Category(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công!"
  });
} 