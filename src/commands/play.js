const TOKEN = require("../token.json");
const YouTube = require('simple-youtube-api');

const youtube = new YouTube(TOKEN.googleKey);

module.exports.run = async (bot, message, args) => {
    try{
    } catch (err) {
        console.log("failed");
    }
}

module.exports.help = {
    name:"play"
};