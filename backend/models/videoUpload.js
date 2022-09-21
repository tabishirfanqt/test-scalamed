const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    video: String,
  },
  {
    timestamps: true,
  }
);

const videoUpload = mongoose.model("videoUpload", VideoSchema);

module.exports = videoUpload;
