const Song = require("../models/song");
const User = require("../models/user");

const songController = {
  getSongs: async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
  },
  postSongs: async (req, res) => {
    try {
      
      const userId = req.userId;
      const { songname, artistname } = req.body;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(401).json({ error: "User Not found" });
      }
      if (user.isAdmin) {
        //console.log(req.files);

        // Access the uploaded files in req.files
        const songUrl = req.files.audio[0].path;
        const imageUrl = req.files.image[0].path;
        const song = new Song({
          songname: songname,
          artistname: artistname,
          imageUrl: imageUrl,
          songUrl: songUrl,
        });

        // Respond to the client
        const savedSong = await song.save();
        res.status(201).json({
          meaasge: "song added successfully",
          song: savedSong,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  editSong: async (req, res) => {
    try {
      const userId = req.userId;
      const songId = req.params.songid;
      const { songname, artistname } = req.body;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(401).json({ error: "User Not found" });
      }
      if (user.isAdmin) {
        const updatedsong = await Song.findByIdAndUpdate(
          { _id: songId },
          { songname, artistname },
          { new: true }
        );
        res.status(201).json({
          meaasge: "song updated successfully",
          song: updatedsong,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteSong: async (req, res) => {
    try {
      const userId = req.userId;
      const songId = req.params.songid;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(401).json({ error: "User Not found" });
      }
      if (user.isAdmin) {
        const deletedsong = await Song.findByIdAndDelete(songId);
        res.status(201).json({
          meaasge: "song deleted successfully",
          song: deletedsong,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = songController;
