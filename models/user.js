const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  likedSongs: {
    type: [String],
    default: [],
  },
  playlist: {
    type: Object,
    default: {String:[String]},
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cteatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema, "Users");
