const express = require("express");
const {
  videoUpload,
  videos,
  getVideoById,
} = require("../controllers/authController");
const router = express.Router();
const {
  isAuthenticatedUser,
  isAuthorizedRoles,
} = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    extension = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    console.log("testing");
  },
});

const upload = multer({
  storage: storage,
});

const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now + file.originalname);
    console.log("testing video");
  },
});
const uploadVideo = multer({
  storage: videoStorage,
});

router
  .route("/videoUpload")
  .post(upload.fields([{ name: "image" }, { name: "video" }]), videoUpload);
router.route("/videos").get(videos);
router.route("/getVideoById/:id").get(getVideoById);

module.exports = router;
