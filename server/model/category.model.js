const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
  name: String,
  parent: String,
  position: Number,
  status: String,
  description: String,
  avatar: String,
  deletedBy: String,
  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  updatedBy: String,
  updatedAt: Date,
  slug: {
    type: String,
    slug: "name", 
    unique: true
  },
}, {
  timestamps: true
})

const Category = mongoose.model('Category', schema, "category");

module.exports = Category;