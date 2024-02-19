const express = require("express");
const songController = require("../controllers/songs");
const authMiddleware = require("../middleware/authMiddleware");
const songRouter = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary for uploading
cloudinary.config({
  cloud_name: "dewfjhlh5",
  api_key: "471568196615338",
  api_secret: "oky3VzCJ6DWRFdmY9nzLALfHTcE",
  secure: true,
});

// Configure Multer and Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
    public_id: (req, file) => "uploades" + "_" + Date.now(), // Optional: specify a unique identifier for the file
  },
});

const upload = multer({ storage: storage });

songRouter.get("/", songController.getSongs);
//songRouter.post("/post", authMiddleware.verifyToken, songController.postSongs);
songRouter.post(
  "/post",authMiddleware.verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  songController.postSongs
);

songRouter.put(
  "/editSong/:songid",
  authMiddleware.verifyToken,
  songController.editSong
);
songRouter.delete(
  "/deleteSong/:songid",
  authMiddleware.verifyToken,
  songController.deleteSong
);

module.exports = songRouter;
