const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
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
    } catch (err) {
        message.channel.send("Could not obtain any search results");
    }
}

module.exports.help = {
    name:"play"
};