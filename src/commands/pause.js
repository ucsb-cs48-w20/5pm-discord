const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const queue = require('../utils/guildQueue');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Paused the music for you!');
    }
    else return message.channel.send('There is nothing playing.');
}

module.exports.help = {
    name: "pause"
}