const AdminAccount = require("../../model/admin-account.model");
const Singer = require("../../model/singer.model")
const moment = require("moment");
const slugify = require("slugify")

module.exports.createPost = async (req, res) => {
  const numDocument = await Singer.countDocuments({});
  if (!req.body.position) {
    req.body.position = numDocument;
  }
  else {
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

module.exports.listGet = async (req, res) => {
  const find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;
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
  if (Object.keys(dateFilter).length > 0) {
    find.createdAt = dateFilter;
  }
  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await Singer.countDocuments(find);
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

  const singerRawList = await Singer.find(find).limit(limitItem).skip(skip);

  const singerList = [];
  for (const item of singerRawList) {
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
    });

    tmp.createdBy = createdByInfo.fullName;
    tmp.updatedBy = updatedByInfo.fullName;

    singerList.push(tmp);
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    singerList: singerList,
    pagination: pagination
  })
}

module.exports.applyMultiPatch = async (req, res) => {
  switch (req.body.status) {
    case "active": case "inactive":
      {
        await Singer.updateMany({
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
        await Singer.updateMany({
          _id: { $in: req.body.idList }
        }, {
          deleted: true,
          updatedBy: req.account.id,
          updatedAt: Date.now()
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
  await Singer.updateOne({
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

module.exports.trashListGet = async (req, res) => {
  const find = {
    deleted: true
  };

  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await Singer.countDocuments(find);
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

  const singerRawList = await Singer.find(find).limit(limitItem).skip(skip);

  const trashList = [];
  for (const item of singerRawList) {
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
    });

    tmp.createdBy = createdByInfo.fullName;
    tmp.updatedBy = updatedByInfo.fullName;

    trashList.push(tmp);
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    trashList: trashList,
    pagination: pagination
  })
}

module.exports.trashApplyMultiPatch = async (req, res) => {
  switch (req.body.status) {
    case "hard-delete":
      {
        await Singer.deleteMany({
          _id: { $in: req.body.idList }
        })
        break;
      }
    case "recovery":
      {
        await Singer.updateMany({
          _id: { $in: req.body.idList }
        }, {
          deleted: false,
          updatedBy: req.account.id,
          updatedAt: Date.now()
        })
        break;
      }
  }

  res.json({
    code: "success",
    message: "Áp dụng thành công!"
  })
}

module.exports.recoveryPatch = async (req, res) => {
  await Singer.updateOne({
    _id: req.body.id
  }, {
    deleted: false,
    updatedBy: req.account.id,
    updatedAt: Date.now()
  })

  res.json({
    code: "success",
    message: "Khôi phục thành công!"
  })
}

module.exports.hardDelete = async (req, res) => {
  await Singer.deleteOne({
    _id: req.body.id
  })

  res.json({
    code: "success",
    message: "Xóa vĩnh viễn thành công!"
  })
}