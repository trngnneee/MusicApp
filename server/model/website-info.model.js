const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String, 
  address: String,
  logo: String,
  favicon: String,
  updatedBy: String,
  updatedAt: Date
})

const WebsiteInfo = mongoose.model('WebsiteInfo', schema, "website-info");

module.exports = WebsiteInfo;