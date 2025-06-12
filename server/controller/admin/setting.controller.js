const WebsiteInfo = require("../../model/website-info.model");

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
  if (req.files)
  {
    if (req.files.logo && req.files.logo.length)
    {
      req.body.logo = req.files.logo[0].path;
    }
    else delete req.body.logo;
    if (req.files.favicon && req.files.favicon.length)
    {
      req.body.favicon = req.files.favicon[0].path;
    }
    else delete req.body.favicon;
  }

  req.body.updatedBy = req.account.id;
  req.body.updatedAt = Date.now();

  const existRecord = await WebsiteInfo.findOne({});
  if (!existRecord)
  {
    const newRecord = new WebsiteInfo(req.body);
    await newRecord.save();
  }
  else
  {
    await existRecord.updateOne(req.body);
  }

  res.json({
    code: "success",
    message: "Cập nhật thông tin thành công!"
  })
}