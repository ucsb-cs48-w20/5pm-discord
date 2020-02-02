const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){ //check permissions
        return errors.noPerms(message, "Moderator Role Needed")
    }

    args = message.content.split(' ').slice(1);
    const userToBan = message.mentions.users.first();
    let banReason = args.slice(1).join(' ');
    
    if (userToBan) {
        if (message.author === userToBan) {
            return message.channel.send(`${message.author} You cannot ban yourself.`);
        }
        else {
            if (!banReason) {
                banReason = "unacceptable behvaror"
            }
            await message.guild.ban(userToBan) // Bans the user
            const banConfirmationEmbed = new Discord.RichEmbed()
            .setColor('RED')
            .setDescription(`✅ ${userToBan} has been successfully banned!`);
            message.channel.send({
            embed: banConfirmationEmbed
            })
            .then(msg => {
                msg.delete({ timeout: 30000 })
            });
        }
    } else { 
        return message.channel.send(`${message.author} Invalid format. Please ban in the following format: ?ban @thisUser#2131 Spam`);
    }
};


module.exports.help = {
    name:"ban"
};
