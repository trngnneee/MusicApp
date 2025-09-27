const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  status: {
    type: String,
    default: "active"
  },
  avatar: String,
  wishlist: Array,
  playlist: Array,
}, {
  timestamps: true
})

const User = mongoose.model('User', schema, "users");

module.exports = User;