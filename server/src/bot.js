const Discord = require("discord.js");
const bot = new Discord.Client();
const DB = require("./db");
const CONFIG = require("../config.json");
const PREFIX = CONFIG.prefix;

let sendDataMessage = (channelID, data) => {
  bot.channels.fetch(channelID).then((channel) => {
    if (!channel) return;
    let weaponDescription = "";
    for (let weapon in data.weaponsCount) {
      weaponDescription += `${weapon}: ${data.weaponsCount[weapon]} \n`;
    }
    if (weaponDescription == "") {
      weaponDescription = "None";
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(`K/D App Response:`)
      .setDescription(`Output for ${data.name}:`)
      .addFields(
        { name: "Kills:", value: data.kills },
        { name: "Deaths:", value: data.deaths },
        { name: "Streak:", value: data.streak },
        { name: "K/D:", value: data.kd },
        { name: `Weapons:`, value: weaponDescription },
        { name: "Average Time Alive:", value: `${data.averageTime}s` }
      );
    channel.send(embed);
  });
};

let generateKey = (message) => {
  if (message.content === `${PREFIX} generate`) {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have permissions to use me.");
    let channelID = message.channel.id;
    let key = DB.generateKey(channelID, message.channel);
  }
};
bot.on("message", generateKey);

let deleteKey = (message) => {
  if (message.content === `${PREFIX} delete`) {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have permissions to use me.");
    let channelID = message.channel.id;
    DB.deleteKey(channelID, message.channel);
  }
};
bot.on("message", deleteKey);

let returnKey = (message) => {
  if (message.content === `${PREFIX} key`) {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have permissions to use me.");
    let channelID = message.channel.id;
    DB.returnKey(channelID, message.channel);
  }
};
bot.on("message", returnKey);

let sendHelp = (message) => {
  if (message.content === `${PREFIX} help`) {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have permissions to use me.");
    let helpEmbed = new Discord.MessageEmbed()
      .setTitle("K/D Bot Help:")
      .addFields(
        {
          name: `${PREFIX} generate`,
          value:
            "This command generates a key for this channel *(using the command again generates a new key and deprecates the old one)*.",
        },
        {
          name: `${PREFIX} delete`,
          value: "This command deletes the generated key.",
        },
        {
          name: `${PREFIX} key`,
          value:
            "This command gives you the current key for this channel if there is one.",
        }
      )
      .setURL("https://optimistic-austin-43a0b1.netlify.app/")
      .setFooter(
        "For more info about the usage of these commands and bot visit K/D Website linked to this message embed."
      );
    message.channel.send(helpEmbed);
  }
};
bot.on("message", sendHelp);

bot.login(CONFIG.token);

module.exports = { sendDataMessage };
