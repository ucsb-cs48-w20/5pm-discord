const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const queue = require('../utils/guildQueue');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    if (!args) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    if (0 <= args && args<=10){
        serverQueue.volume = args;
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args / 15);
        return message.channel.send(`I set the volume to: **${args}**`);
    }
    else {
        return message.channel.send(`Volume must be from 0-10`);
    }
}

module.exports.help = {
    name: "volume"
}