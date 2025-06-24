const WebsiteInfo = require("../../model/website-info.model")

module.exports.infoGet = async (req, res) => {
  const rawWebsiteInfo = await WebsiteInfo.findOne({});
  
  const websiteInfo = {
    name: rawWebsiteInfo.name,
    logo: rawWebsiteInfo.logo,
    favicon: rawWebsiteInfo.favicon,
  }

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công!",
    websiteInfo: websiteInfo
  })
}