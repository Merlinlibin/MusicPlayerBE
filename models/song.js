const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: true,
    unique: true,
  },
  artistname: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  songUrl: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("song", songSchema, "Songs");
