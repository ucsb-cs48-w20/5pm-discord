const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    let reason = args.join(' ') ? args.join(' ') : 'I am currently afk, I will reply as soon possible.';
    let afklist = bot.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
            reason: reason
        };
        bot.afk.set(message.author.id, construct);
        return message.reply(`I set your AFK: ${reason}`)
            .then(msg => msg.delete(5000));
    }
};

module.exports.help = {
    name:"afk"
};
