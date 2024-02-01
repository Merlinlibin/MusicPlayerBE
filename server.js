const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/userRoutes");
const SongRouter = require("./routes/songRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/users", UserRouter);
app.use("/api/songs", SongRouter);

module.exports = app;