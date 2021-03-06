const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");

module.exports.run = async (bot, message, args) => {

    let messagecount = parseInt(args.join(' '));
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return errors.noPerms(message, "Manage messages");
    }
    if (messagecount > 100) {
        return message.reply('you can only delete at most 100 messages at a time.')
            .then(msg => {
                msg.delete(2750)
            });;
    }
    if (isNaN(messagecount)) {
        return message.reply('Please specify the number of messages to clear `ex: ?purge 10`')
            .then(msg => {
                msg.delete(2750)
            });;
    }
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));

    message.channel.send(messagecount + " Messages Deleted.")
        .then(msg => {
            msg.delete(2750)
        });

    if (message.content.startsWith(config.prefix + 'purge')) message.delete()
};

module.exports.help = {
    name:"purge"
};
