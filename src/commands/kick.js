const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){ //check permissions
        return errors.noPerms(message, "Moderator Role Needed")
    }
    args = message.content.match(/"(.+?)"/g);

    const user = message.mentions.users.first();
    if (user) {
        const member = message.guild.member(user);
        if (member) {
            if(args.length === 0){
                args = "Unspecified Reason"
            }
            member.kick(args).then(() => {

                message.reply(`Successfully kicked ${user.username}`);
            }).catch(err => {

                message.reply('I was unable to kick the member');
                console.error(err);
            });
        } else {
            message.reply('That user isn\'t in this guild!');
        }
    } else {
        message.reply('You didn\'t mention the user to kick!');
    }
};

module.exports.help = {
    name:"kick"
};
