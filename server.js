const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());

server.use(helmet());

server.use(cors());

server.get("/", function (req, res) {
  res.send("API is online 👍");
});

//Route fallback (404)
server.use(function (req, res) {
  res.status(404).json({ message: "Not found" });
});

module.exports = server;
