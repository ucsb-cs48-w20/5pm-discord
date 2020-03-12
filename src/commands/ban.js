const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){ //check permissions
        return errors.noPerms(message, "Moderator Role Needed")
    }

    args = message.content.split(' ').slice(1);
    const userToBan = message.mentions.users.first();
    let banReason = args.slice(1).join(' ');
    banReason = banReason.substring(1, banReason.length - 1);

    if (userToBan) {
        if (message.author === userToBan) {
            return message.channel.send(`${message.author} You cannot ban yourself.`);
        }
        else {
            if (!banReason) {
                banReason = "unacceptable behavior"
            }
            await userToBan.send("You have been banned for: " + banReason);
            await message.guild.ban(userToBan) // Bans the user
            const banConfirmationEmbed = new Discord.RichEmbed()
            .setColor('RED')
            .setDescription(`✅ ${userToBan} has been successfully banned!`);
            message.channel.send({
            embed: banConfirmationEmbed
            })
            .then(msg => {
                msg.delete(10000)
            });
        }
    } else {
        return message.channel.send(`${message.author} Invalid format or User is not in the server. Please ban in the following format: ?ban @thisUser#2131 Spam or Try another User.`);
    }
};


module.exports.help = {
    name:"ban"
};
