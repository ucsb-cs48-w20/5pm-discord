//must activate youtube data api

const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const YouTube = require('simple-youtube-api');
// const ytdl = require('ytdl-core');

const youtube = new YouTube(botconfig.googleApiKey);
const queue = new Map();

module.exports.run = async (bot, message, args) => {
    console.log("hi");
    // const searchString = args.slice(1).join(' ');
    // const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    // const url = "https://www.youtube.com/watch?v=WQe8nZ4WBYk&t=103s";
    const url = args;
    const serverQueue = queue.get(message.guild.id);
    console.log(url);

    // youtube.searchVideos("mac miller")
    // .then(results => {
    // console.log(results);
    // })
    // .catch(console.error);

    var videos = await youtube.searchVideos("mac miller", 10);
    let index = 0;
    message.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
    `);

    // const voiceChannel = message.member.voiceChannel;
    // if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    // const permissions = voiceChannel.permissionsFor(message.member);
    // if (!permissions.has('CONNECT')) {
    //     return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    // }
    // if (!permissions.has('SPEAK')) {
    //     return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    // }

    // try{
    //     const video = await youtube.getVideo(url);
    //     message.channel.send(`The video's title is ${video.title}`)
    // } catch (error) {
    //     console.error(error);
    // }

};

module.exports.help = {
    name:"play"
};
