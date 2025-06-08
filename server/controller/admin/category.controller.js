const Category = require("../../model/category.model");
const categoryHelper = require("../../helper/category.helper");
const AdminAccount = require("../../model/admin-account.model");
const moment = require("moment");

module.exports.createGet = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false
  });

  const categoryTree = categoryHelper.categoryTreeBuild(categoryList);

  res.json({
    code: "success",
    message: "Lấy data thành công!",
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

  if (req.file) req.body.avatar = req.file.path;
  
  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new Category(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo danh mục thành công!"
  });
} 

module.exports.listGet = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false
  })

  let category = [];
  for (const item of categoryList)
  {
    const tmp = {
      name: item.name,
      avatar: item.avatar,
      position: item.position,
      status: item.status
    };
    tmp.createdAt = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    tmp.updatedAt = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");

    const createdByInfo = await AdminAccount.findOne({
      _id: item.createdBy
    });
    const updatedByInfo = await AdminAccount.findOne({
      _id: item.updatedBy
    })

    tmp.createdBy = createdByInfo.fullName;
    tmp.updatedBy = updatedByInfo.fullName;

    category.push(tmp);
  }

  res.json({
    code: "success",
    message: "Lấy data thành công!",
    category: category
  })
}