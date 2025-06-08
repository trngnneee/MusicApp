const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fullName: String,
  email: String, 
  password: String,
  status: String
})

const AdminAccount = mongoose.model('AdminAccount', schema, "admin-account");

module.exports = AdminAccount;