const Role = require("../../model/role.model");
const WebsiteInfo = require("../../model/website-info.model");
const slugify = require("slugify")

module.exports.websiteInfoGet = async (req, res) => {
  const existRecord = await WebsiteInfo.findOne({});
  const websiteInfo = {
    name: existRecord.name,
    phone: existRecord.phone,
    address: existRecord.address,
    email: existRecord.email,
    logo: existRecord.logo,
    favicon: existRecord.favicon,
  };
  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    websiteInfo: websiteInfo
  })
}

module.exports.websiteInfoPatch = async (req, res) => {
  if (req.files) {
    if (req.files.logo && req.files.logo.length) {
      req.body.logo = req.files.logo[0].path;
    }
    else delete req.body.logo;
    if (req.files.favicon && req.files.favicon.length) {
      req.body.favicon = req.files.favicon[0].path;
    }
    else delete req.body.favicon;
  }

  req.body.updatedBy = req.account.id;
  req.body.updatedAt = Date.now();

  const existRecord = await WebsiteInfo.findOne({});
  if (!existRecord) {
    const newRecord = new WebsiteInfo(req.body);
    await newRecord.save();
  }
  else {
    await existRecord.updateOne(req.body);
  }

  res.json({
    code: "success",
    message: "Cập nhật thông tin thành công!"
  })
}

module.exports.roleCreatePost = async (req, res) => {
  const newRecord = new Role(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo nhóm quyền thành công!"
  })
}

module.exports.roleListGet = async (req, res) => {
  const find = {
    deleted: false
  };

  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await Role.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItem);

  let page = 1;
  if (req.query.page) {
    const tmp = parseInt(req.query.page);
    if (tmp > 0) page = tmp;
  }
  if (totalPage != 0 && page > totalPage) {
    page = totalPage;
  }
  const skip = (page - 1) * limitItem;

  const pagination = {
    limitItem: limitItem,
    totalRecord: totalRecord,
    totalPage: totalPage,
    skip: skip
  };

  const rawRoleList = await Role.find(find).limit(limitItem).skip(skip);
  const roleList = [];
  for (const item of rawRoleList) {
    roleList.push({
      id: item.id,
      name: item.name,
      description: item.description
    })
  }
  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    roleList: roleList,
    pagination: pagination
  })
}

module.exports.roleListApplyMultiPatch = async (req, res) => {
  await Role.updateMany({
    _id: { $in: req.body.idList }
  }, {
    deleted: true,
    deletedAt: Date.now(),
    deletedBy: req.account.id
  });
  res.json({
    code: "success",
    message: "Áp dụng thành công!"
  })
}

module.exports.roleListDeletePatch = async (req, res) => {
  await Role.updateOne({
    _id: req.body.id
  }, {
    deleted: true,
    deletedAt: Date.now(),
    deletedBy: req.account.id
  });
  res.json({
    code: "success",
    message: "Xóa thành công!"
  })
}