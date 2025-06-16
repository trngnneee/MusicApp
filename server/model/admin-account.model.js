const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fullName: String,
  email: String, 
  phone: String,
  role: String,
  jobPosition: String,
  status: String,
  password: String,
  avatar: String
})

const AdminAccount = mongoose.model('AdminAccount', schema, "admin-account");

module.exports = AdminAccount;