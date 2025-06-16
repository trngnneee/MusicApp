const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
  fullName: String,
  email: String, 
  phone: String,
  role: String,
  jobPosition: String,
  status: String,
  password: String,
  avatar: String,
  deletedBy: String,
  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  updatedBy: String,
  createdBy: String,
  slug: {
    type: String,
    slug: "fullName", 
    unique: true
  },
}, {
  timestamps: true
})

const AdminAccount = mongoose.model('AdminAccount', schema, "admin-account");

module.exports = AdminAccount;