const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');
const Util = require('discord.js');
const ytdl = require('youtube-dl');
const queue = require('../utils/guildQueue')

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;
    try{
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');

        const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
        }
		if (!permissions.has('SPEAK')) {
			return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}
        
        var videos = await youtube.searchVideos(message, 10);
        let index = 0;
        message.channel.send(`
        __**Song selection:**__

        ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

        Please provide a value to select one of the search results ranging from 1-10.
        `);
        try{
            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                maxMatches: 1,
                time: 10000,
                errors: ['time']
            });
        } catch (err){
            return message.channel.send('No or invalid value entered, cancelling video selection.');
        }
        const videoIndex = parseInt(response.first().content);
        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        console.log(video);
        return handleVideo(video, message, voiceChannel);
    } catch (err) {
        message.channel.send("Could not obtain any search results");
    }
}

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 1,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
		return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}


module.exports.help = {
    name:"play"
};