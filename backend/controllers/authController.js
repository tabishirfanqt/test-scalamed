const videoUpload = require("../models/videoUpload");

exports.videoUpload = async (req, res, next) => {
  try {
    console.log("mid", req.body);
    const data = req.body;
    const image = req.files.image;
    const video = req.files.video;

    console.log("mid");

    data.image = image[0].filename;
    data.video = video[0].filename;

    console.log("data is", data);
    const destinations = await videoUpload.create(data);
    res.json({
      message: "success",
      destinations,
    });
  } catch (error) {
    console.log("failed", error);
    res.json({
      status: false,
      error,
    });
  }
};

exports.videos = async (req, res) => {
  try {
    const result = await videoUpload.find({});
    res.json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
exports.getVideoById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await videoUpload.findById(id);
    res.json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
