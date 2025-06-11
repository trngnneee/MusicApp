const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const schema = new mongoose.Schema({
  name: String,
  category: String,
  position: Number,
  status: String,
  lyric: String,
  singers: Array,
  avatar: String,
  audio: String,
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

const Song = mongoose.model('Song', schema, "songs");

module.exports = Song;