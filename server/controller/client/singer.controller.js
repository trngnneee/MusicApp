const Singer = require("../../model/singer.model")

module.exports.listGet = async (req, res) => {
  const rawSingerList = await Singer.find({
    deleted: false,
    status: "active"
  })

  let singerList = [];
  for (const item of rawSingerList) {
    singerList.push({
      avatar: item.avatar,
      name: item.name,
      description: item.description,
      slug: item.slug,
      link: `/singers/${item.slug}`
    });
  }

  if (req.query.limit)
  {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0)
    {
      singerList = singerList.slice(0, limit);
    }
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