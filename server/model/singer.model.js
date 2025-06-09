const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
  name: String,
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
  createdBy: String,
  slug: {
    type: String,
    slug: "name", 
    unique: true
  },
}, {
  timestamps: true
})

const Singer = mongoose.model('Singer', schema, "singers");

module.exports = Singer;