const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const queue = require('../utils/guildQueue');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing');
    serverQueue.voiceChannel.leave();
    queue.delete(message.guild.id);
    return message.channel.send('Your queue is now empty!');
}

module.exports.help = {
    name: "clear"
}