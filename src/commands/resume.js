const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const queue = require('../utils/guildQueue');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Resumed the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

module.exports.help = {
    name: "resume"
}