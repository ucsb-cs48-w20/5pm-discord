const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    try{
        var videos = await youtube.searchVideos(message, 10);
        let index = 0;
        message.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
					`);
    } catch (err) {
        console.log(err);
    }
}

module.exports.help = {
    name:"play"
};