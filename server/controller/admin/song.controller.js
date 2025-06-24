const { categoryTreeBuild, findNode, collectAllChild } = require("../../helper/category.helper");
const AdminAccount = require("../../model/admin-account.model");
const Category = require("../../model/category.model");
const Singer = require("../../model/singer.model");
const Song = require("../../model/song.model");
const moment = require("moment");
const slugify = require("slugify");

module.exports.createGet = async (req, res) => {
  const categoryList = await Category.find({
    deleted: false
  });
  const categoryTree = categoryTreeBuild(categoryList);

  const singerRawList = await Singer.find({
    deleted: false
  });
  const singerList = [];
  for (const item of singerRawList) {
    singerList.push({
      id: item.id,
      name: item.name
    })
  }
  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    categoryTree: categoryTree,
    singerList: singerList
  })
}

module.exports.createPost = async (req, res) => {
  if (!req.account.permission.includes("song-create")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  const numDoc = await Song.countDocuments({});
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  }
  else {
    req.body.position = numDoc;
  }

  if (req.files) {
    if (req.files.avatar && req.files.avatar.length) {
      req.body.avatar = req.files.avatar[0].path;
    }
    if (req.files.audio && req.files.audio.length) {
      req.body.audio = req.files.audio[0].path;
    }
  }

  req.body.singers = JSON.parse(req.body.singers);

  req.body.createdBy = req.account.id;
  req.body.updatedBy = req.account.id;

  const newRecord = new Song(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo bài hát thành công!"
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
  if (req.query.category) {
    const categoryList = await Category.find({
      deleted: false
    });
    const tree = categoryTreeBuild(categoryList);
    const targetNode = findNode(tree, req.query.category);
    const idList = collectAllChild(targetNode);
    find.category = { $in: idList }
  }
  if (req.query.search) {
    const search = slugify(req.query.search, {
      lower: true
    });
    const searchRegex = new RegExp(search);
    find.slug = searchRegex;
  }

  const limitItem = 5;
  const totalRecord = await Song.countDocuments(find);
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

  const songRawList = await Song.find(find).limit(limitItem).skip(skip);
  const songList = [];
  for (const item of songRawList) {
    const tmp = {
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      status: item.status
    };

    const categoryDetail = await Category.findOne({
      _id: item.category
    });
    if (categoryDetail) tmp.categoryName = categoryDetail.name;

    tmp.createdAt = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    tmp.updatedAt = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");

    const createdByInfo = await AdminAccount.findOne({
      _id: item.createdBy
    });
    const updatedByInfo = await AdminAccount.findOne({
      _id: item.updatedBy
    });
    if (createdByInfo) tmp.createdBy = createdByInfo.fullName;
    if (updatedByInfo) tmp.updatedBy = updatedByInfo.fullName;

    tmp.singerList = [];
    for (const id of item.singers) {
      const singerInfo = await Singer.findOne({
        _id: id
      });
      if (singerInfo) tmp.singerList.push(singerInfo.name);
    }

    songList.push(tmp);
  };

  const adminAccountRaw = await AdminAccount.find({});
  const adminAccountList = [];
  for (const item of adminAccountRaw) {
    adminAccountList.push({
      id: item.id,
      fullName: item.fullName
    })
  };

  const categoryList = await Category.find({
    deleted: false
  });
  const categoryTree = categoryTreeBuild(categoryList);

  res.json({
    code: "success",
    message: "Lấy data thành công!",
    songList: songList,
    adminAccountList: adminAccountList,
    categoryTree: categoryTree,
    pagination: pagination
  })
}

module.exports.applyMultiPatch = async (req, res) => {
  switch (req.body.status) {
    case "delete":
      {
        if (!req.account.permission.includes("song-delete")) {
          res.json({
            code: "error",
            message: "Không có quyền sử dụng tính năng này!"
          })
          return;
        }
        await Song.updateMany({
          _id: { $in: req.body.idList }
        }, {
          deleted: true,
          deletedAt: Date.now(),
          deletedBy: req.account.id
        })
        break;
      }
    case "active": case "inactive":
      {
        if (!req.account.permission.includes("song-edit")) {
          res.json({
            code: "error",
            message: "Không có quyền sử dụng tính năng này!"
          })
          return;
        }
        await Song.updateMany({
          _id: { $in: req.body.idList }
        }, {
          status: req.body.status,
          updatedAt: Date.now(),
          updatedBy: req.account.id
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
  if (!req.account.permission.includes("song-delete")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  try {
    const id = req.params.id;
    await Song.updateOne({
      _id: id
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
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.editGet = async (req, res) => {
  try {
    const id = req.params.id;
    const songRawDetail = await Song.findOne({
      _id: id
    })
    const songDetail = {
      name: songRawDetail.name,
      category: songRawDetail.category,
      position: songRawDetail.position,
      status: songRawDetail.status,
      singers: songRawDetail.singers,
      avatar: songRawDetail.avatar,
      audio: songRawDetail.audio,
      lyric: songRawDetail.lyric,
    };

    const categoryList = await Category.find({
      deleted: false
    });
    const categoryTree = categoryTreeBuild(categoryList);

    const singerRawList = await Singer.find({
      deleted: false
    });
    const singerList = [];
    for (const item of singerRawList) {
      singerList.push({
        id: item.id,
        name: item.name
      })
    }

    res.json({
      code: "error",
      message: "Lấy data thành công!",
      songDetail: songDetail,
      categoryTree: categoryTree,
      singerList: singerList
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.editPatch = async (req, res) => {
  if (!req.account.permission.includes("song-edit")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  try {
    const id = req.params.id;

    const numDoc = await Song.countDocuments({});
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    }
    else {
      req.body.position = numDoc;
    }

    if (req.files) {
      if (req.files.avatar && req.files.avatar.length) {
        req.body.avatar = req.files.avatar[0].path;
      }
      else delete req.body.avatar;
      if (req.files.audio && req.files.audio.length) {
        req.body.audio = req.files.audio[0].path;
      }
      else delete req.body.audio
    }

    req.body.singers = JSON.parse(req.body.singers);

    req.body.updatedBy = req.account.id;

    await Song.updateOne({
      _id: id
    }, req.body);

    res.json({
      code: "success",
      message: "Cập nhật thành công"
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
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
  const totalRecord = await Song.countDocuments(find);
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

  const songRawList = await Song.find(find).limit(limitItem).skip(skip);
  const songList = [];
  for (const item of songRawList) {
    const tmp = {
      id: item.id,
      name: item.name,
      avatar: item.avatar,
      status: item.status
    };

    const categoryDetail = await Category.findOne({
      _id: item.category
    });
    if (categoryDetail) tmp.categoryName = categoryDetail.name;

    tmp.createdAt = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
    tmp.updatedAt = moment(item.updatedAt).format("HH:mm - DD/MM/YYYY");

    const createdByInfo = await AdminAccount.findOne({
      _id: item.createdBy
    });
    const updatedByInfo = await AdminAccount.findOne({
      _id: item.updatedBy
    });
    if (createdByInfo) tmp.createdBy = createdByInfo.fullName;
    if (updatedByInfo) tmp.updatedBy = updatedByInfo.fullName;

    tmp.singerList = [];
    for (const id of item.singers) {
      const singerInfo = await Singer.findOne({
        _id: id
      });
      tmp.singerList.push(singerInfo.name);
    }

    songList.push(tmp);
  };

  res.json({
    code: "success",
    message: "Lấy data thành công!",
    songList: songList,
    pagination: pagination
  })
}

module.exports.trashApplyMultiPatch = async (req, res) => {
  if (!req.account.permission.includes("song-trash")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  switch (req.body.status) {
    case "hard-delete":
      {
        await Song.deleteMany({
          _id: { $in: req.body.idList }
        })
        break;
      }
    case "recovery":
      {
        await Song.updateMany({
          _id: { $in: req.body.idList }
        }, {
          deleted: false,
          updatedAt: Date.now(),
          updatedBy: req.account.id
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
  if (!req.account.permission.includes("song-trash")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  try {
    const id = req.params.id;
    await Song.updateOne({
      _id: id
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
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}

module.exports.hardDelete = async (req, res) => {
  if (!req.account.permission.includes("song-trash")) {
    res.json({
      code: "error",
      message: "Không có quyền sử dụng tính năng này!"
    })
    return;
  }
  try {
    const id = req.params.id;
    await Song.deleteOne({
      _id: id
    })
    res.json({
      code: "success",
      message: "Xóa thành công!"
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}