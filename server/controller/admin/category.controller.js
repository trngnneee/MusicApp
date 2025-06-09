const Category = require("../../model/category.model");
const categoryHelper = require("../../helper/category.helper");
const AdminAccount = require("../../model/admin-account.model");
const moment = require("moment");
const slugify = require("slugify");

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
  const find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.createdBy) {
    find.createdBy = req.query.createdBy;
  }
  const dateFilter = {};
  if (req.query.startDate) {
    const startDate = moment(req.query.startDate).startOf("date").toDate();
    dateFilter.$gte = startDate;
  }
  if (req.query.endDate) {
    const endDate = moment(req.query.endDate).endOf("date").toDate();
    dateFilter.$lte = endDate;
  }
  if (Object.keys(dateFilter).length > 0) find.createdAt = dateFilter;
  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await Category.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItem);

  let page = 1;
  if (req.query.page) {
    const tmp = parseInt(req.query.page);
    if (tmp > 0) page = tmp;
  }
  if (totalPage != 0 && page > totalPage) page = totalPage;
  const skip = (page - 1) * limitItem;

  const pagination = {
    limit: limitItem,
    totalRecord: totalRecord,
    totalPage: totalPage,
    skip: skip
  };

  const categoryList = await Category.find(find).limit(limitItem).skip(skip);

  let category = [];
  for (const item of categoryList) {
    const tmp = {
      id: item.id,
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

  const adminAccountRawList = await AdminAccount.find({
    status: "active"
  })
  const adminAccountList = [];
  for (const item of adminAccountRawList) {
    adminAccountList.push({
      id: item.id,
      fullName: item.fullName
    })
  }

  res.json({
    code: "success",
    message: "Lấy data thành công!",
    category: category,
    adminAccountList: adminAccountList,
    pagination: pagination
  })
}

module.exports.applyMultiPatch = async (req, res) => {
  switch (req.body.status) {
    case "active": case "inactive":
      {
        await Category.updateMany({
          _id: { $in: req.body.idList }
        }, {
          status: req.body.status,
          updatedBy: req.account.id,
          updatedAt: Date.now()
        })
        break;
      }
    case "delete":
      {
        await Category.updateMany({
          _id: { $in: req.body.idList }
        }, {
          deleted: true,
          deletedBy: req.account.id,
          deletedAt: Date.now()
        })
        break;
      }
  }
  res.json({
    code: "success",
    message: "Áp dụng thành công!"
  })
}

module.exports.deletePatch = async (req, res) => {
  await Category.updateOne({
    _id: req.body.id
  }, {
    deleted: true,
    deletedBy: req.account.id,
    deletedAt: Date.now()
  })
  res.json({
    code: "success",
    message: "Xóa thành công!"
  })
}