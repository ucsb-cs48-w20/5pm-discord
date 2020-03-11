const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const fs = require("fs");
let config = require("../botconfig.json");
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'FCXWsCq8tTonwN2p3CrUmnzE3',
    consumer_secret:      'ogSnzSBVN7A44Y3quVm84NdNelilOTiTo40vR3vkqivCTyZkDS',
    access_token:         '1237635282649763840-fOYbU0A6OX2cDekcI4W1yMWxFhl9ut',
    access_token_secret:  'NtFwm5Fh87ES38VHnbtffR25n74ekXI2hEE1xTFDUZQt3',
  })

module.exports.run = async (bot, message, args) => {
    followedUsers = []
    args = message.content.match(/(?:[^\s"]+|"[^"]*")+/g).slice(1);
    if (args.length != 2) { //check to see if only one user is specified
        return message.channel.send(`${message.author} Please enter a valid command as follows: ?twitter getLastTweet "elonmusk"`);
    }
    if (args[1] != "followUser" && args[1] != "postTweet" && args[1] != "getLast5Tweets")
    if (args[1][0] != '"' || args[1][args[1].length - 1] != '"') { //check ot make sure the user is wrapped in double quotes, i.e. ?twitter "elonmusk"
        return message.channel.send(`${message.author} Please put the user's twitter handle wrapped in double quotes.`);
    }
    args[1] = args[1].substring(1, args[1].length - 1); //get rid of quotes
};

module.exports.help = {
    name: "twitter"
};