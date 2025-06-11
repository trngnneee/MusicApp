const { categoryTreeBuild } = require("../../helper/category.helper");
const Category = require("../../model/category.model");
const Singer = require("../../model/singer.model");
const Song = require("../../model/song.model");

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
  const numDoc = await Song.countDocuments({});
  if (req.body.position)
  {
    req.body.position = parseInt(req.body.position);
  }
  else
  {
    req.body.position = numDoc;
  }

  if (req.files)
  {
    if (req.files.avatar && req.files.avatar.length)
    {
      req.body.avatar = req.files.avatar[0].path;
    }
    if (req.files.audio && req.files.audio.length)
    {
      req.body.audio = req.files.audio[0].path;
    }
  }

  const newRecord = new Song(req.body);
  await newRecord.save();

  res.json({
    code: "success",
    message: "Tạo bài hát thành công!"
  });
}