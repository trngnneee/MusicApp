const Category = require("../../model/category.model")

module.exports.listGet = async (req, res) => {
  const categoryRawList = await Category.find({
    deleted: false,
    status: "active"
  })

  let categoryList = [];
  for (const item of categoryRawList) {
    categoryList.push({
      id: item._id,
      avatar: item.avatar,
      name: item.name,
      description: item.description,
      slug: item.slug,
      link: `/category/${item.slug}`
    });
  }

  if (req.query.limit)
  {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0)
    {
      categoryList = categoryList.slice(0, limit);
    }
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    categoryList: categoryList
  })
}

module.exports.detailGet = async (req, res) => {
  try {
    const slug = req.params.slug;

    const rawCategoryDetail = await Category.findOne({
      deleted: false,
      status: "active",
      slug: slug
    })

    const categoryDetail = {
      name: rawCategoryDetail.name,
      avatar: rawCategoryDetail.avatar,
      description: rawCategoryDetail.description
    }

    res.json({
      code: "success",
      message: "Lấy dữ liệu thành công!",
      categoryDetail: categoryDetail
    })
  }
  catch (error) {
    res.json({
      code: "error",
      message: error
    })
  }
}