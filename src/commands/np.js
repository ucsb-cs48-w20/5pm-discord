const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const queue = require('../utils/guildQueue');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
}

module.exports.help = {
    name: "np"
}