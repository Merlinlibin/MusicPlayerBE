const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const userContrllers = {
  signup: async (req, res) => {
    try {
      const body = req.body;
      if (body.password.length < 6 || !body.password)
        return res
          .status(400)
          .json({ error: "password must be 6 character long" });

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.password, saltRounds);
      const user = new User({
        username: body.username,
        email: body.email,
        passwordHash: passwordHash,
      });

      const savedUser = await user.save();
      res
        .status(201)
        .json({ meaasge: "User created successfully", user: savedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.status(401).json({ error: "User Not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        return response.status(401).json({ error: "Invalid Password" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          id: user._id,
        },
        config.JWT_SCERET
      );
      console.log(token);
      response
        .status(200)
        .json({ token, username: user.username, email: user.email });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },
  editProfile: async (request, response) => {
    try {
      const userId = request.userId;
      const { username, likedSongs, playlist } = request.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { username, likedSongs, playlist },
        { new: true }
      );
      response.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },

  deleteProfile: async (request, response) => {
    try {
      const userId = request.userId;
      await User.findByIdAndDelete(userId);
      response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  likedSong: async (request, response) => { 
    try {
      const userId = request.userId;
      const user = await User.findOne({ _id:userId });
      const { _id } = request.body;

      const updateLikes = await User.findByIdAndUpdate(
        userId,
        { likedSongs: [...user.likedSongs,_id] },
        { new: true }
      );
      response
        .status(200)
        .json({ message: "song liked successfully", updateLikes });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
   unlikedSong: async (request, response) => { 
    try {
      const userId = request.userId;
      const user = await User.findOne({ _id:userId });
      const { _id } = request.body;
      const unlikedSong = [];
      for (const ids of user.likedSongs) {
        if (ids !== _id) {
          unlikedSong;
        }
      }

      const updateLikes = await User.findByIdAndUpdate(
        userId,
        { likedSongs: _id },
        { new: true }
      );
      response
        .status(200)
        .json({ message: "song unliked successfully", updateLikes });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
};

module.exports = userContrllers;
