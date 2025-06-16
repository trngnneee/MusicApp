const AdminAccount = require("../../model/admin-account.model");
const Role = require("../../model/role.model");
const WebsiteInfo = require("../../model/website-info.model");
const slugify = require("slugify")
const bcrypt = require("bcryptjs");

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

module.exports.adminAccountRoleListGet = async (req, res) => {
  const roleRawList = await Role.find({
    deleted: false
  })

  const roleList = [];
  for (const item of roleRawList) {
    roleList.push({
      id: item.id,
      name: item.name
    })
  }

  res.json({
    code: "success",
    message: 'Lấy dữ liệu thành công!',
    roleList: roleList
  })
}

module.exports.adminAccountCreate = async (req, res) => {
  const existAccount = await AdminAccount.findOne({
    email: req.body.email
  })
  if (existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  if (req.file) {
    req.body.avatar = req.file.path;
  }

  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new AdminAccount(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo tài khoản quản trị thành công!"
  })
}

module.exports.adminAccountListGet = async (req, res) => {
  const find = {};

  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.role) {
    find.role = req.query.role;
  }
  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await AdminAccount.countDocuments(find);
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

  const adminAccountRawList = await AdminAccount.find(find).limit(limitItem).skip(skip);
  const adminAccountList = [];
  for (const item of adminAccountRawList) {
    const tmp = {
      id: item.id,
      fullName: item.fullName,
      avatar: item.avatar,
      email: item.email,
      phone: item.phone,
      role: "",
      jobPosition: item.jobPosition,
      status: item.status
    };

    const roleInfo = await Role.findOne({
      _id: item.role
    });
    if (roleInfo) tmp.role = roleInfo.name;

    adminAccountList.push(tmp);
  }

  const roleRawList = await Role.find({
    deleted: false
  })
  const roleList = [];
  for (const item of roleRawList) {
    roleList.push({
      id: item.id,
      name: item.name
    })
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    adminAccountList: adminAccountList,
    roleList: roleList,
    pagination: pagination
  })
}

module.exports.adminAccountApplyMulti = async (req, res) => {
  switch (req.body.status) {
    case "active": case "inactive":
      {
        await AdminAccount.updateMany({
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
        await AdminAccount.updateMany({
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

module.exports.adminAccountDeletePatch = async (req, res) => {
  await AdminAccount.updateOne({
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