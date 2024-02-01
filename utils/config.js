require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SCERET = process.env.JWTSecret;

module.exports = { PORT, MONGODB_URI, JWT_SCERET };
