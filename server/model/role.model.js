const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
  name: String,
  description: String, 
  permissions: Array,
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
    slug: "name", 
    unique: true
  },
}, {
  timestamps: true
})

const Role = mongoose.model('Role', schema, "role");

module.exports = Role;