const Discord = require("discord.js");
const bot = new Discord.Client();
const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const CONFIG = require("../config.json");
const BOTINDEX = require("./bot");
const DB = require("./db");
const PREFIX = CONFIG.prefix;
const PORT = 6969;

let app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 2000,
    max: 1,
    message: "Too many requests",
  })
);

// Receiving Requests
app.post("/", (req, res) => {
  DB.findChannel(req.body.key).then((results) => {
    if (results !== null) {
      BOTINDEX.sendDataMessage(results.channelID, req.body);
    }
  });
  res.send("Request Received.");
});

// Starting bot and server
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});

bot.login(CONFIG.token);
