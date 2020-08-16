const MongoClient = require("mongodb").MongoClient;
const crypto = require("crypto");
const CONFIG = require("../config.json");

let database;
let collection;

const client = new MongoClient(CONFIG.mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error) => {
  if (error) throw error;
  database = client.db("KDApp");
  collection = database.collection("Keys");
  console.log("DB Ready.");
});

let findChannel = (key) => {
  return collection.findOne({ key: key });
};

let returnKey = (channelID, channel) => {
  collection.findOne({ channelID: channelID }).then((results) => {
    if (results !== null) {
      let key = results.key;
      channel.send(`Your key is ${"`" + key + "`"}.`);
    } else {
      channel.send("No key found.");
    }
  });
};

let deleteKey = async (channelID, channel) => {
  collection.findOne({ channelID: channelID }, (err, results) => {
    if (err) throw err;
    if (results !== null) {
      collection.deleteOne({ channelID: channelID });
      channel.send(`Channel key got deleted.`);
    } else {
      channel.send(`This channel has no key.`);
    }
  });
};

let generateKey = (channelID, channel) => {
  console.log("Working");
  let newKey = crypto.randomBytes(4);
  newKey = newKey.toString("hex");
  collection.findOne({ channelID: channelID }, (err, results) => {
    if (err) throw err;
    if (results === null) {
      collection.insert({
        channelID: channelID,
        key: newKey,
      });
      channel.send(`Your new key is ${"`" + newKey + "`"}.`);
    } else {
      collection.update(
        { channelID: channelID },
        { channelID: channelID, key: newKey }
      );
      channel.send(`Key was updated to ${"`" + newKey + "`"}.`);
    }
  });
  return newKey;
};

module.exports = { generateKey, deleteKey, returnKey, findChannel };
