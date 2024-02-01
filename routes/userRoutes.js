const express = require("express");
const userController = require("../controllers/users");
const authMiddleware = require("../middleware/authMiddleware");
const UserRouter = express.Router();

UserRouter.post("/signup", userController.signup);
UserRouter.post("/login", userController.login);


UserRouter.put(
  "/editProfile",
  authMiddleware.verifyToken,
  userController.editProfile
);
UserRouter.delete(
  "/deleteProfile",
  authMiddleware.verifyToken,
  userController.deleteProfile
);

UserRouter.put(
  "/songs/likes",
  authMiddleware.verifyToken,
  userController.likedSong
);
UserRouter.put(
  "/songs/unlikes",
  authMiddleware.verifyToken,
  userController.unlikedSong
);

module.exports = UserRouter;
