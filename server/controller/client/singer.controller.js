const Singer = require("../../model/singer.model")

module.exports.listGet = async (req, res) => {
  const rawSingerList = await Singer.find({
    deleted: false,
    status: "active"
  })

  const singerList = [];
  for (const item of rawSingerList) {
    singerList.push({
      avatar: item.avatar,
      name: item.name,
      description: item.description,
      slug: item.slug,
      link: `/singers/${item.slug}`
    });
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    singerList: singerList
  })
}

module.exports.detailGet = async (req, res) => {
  try {
    const slug = req.params.slug;

    const rawSingerDetail = await Singer.findOne({
      deleted: false,
      status: "active",
      slug: slug
    })

    const singerDetail = {
      name: rawSingerDetail.name,
      avatar: rawSingerDetail.avatar,
      description: rawSingerDetail.description,
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      singerDetail: singerDetail
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}