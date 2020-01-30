const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){ //check permissions
        return errors.noPerms(message, "Moderator Role Needed")
    }

    args = message.content.split(' ').slice(1);
    const userToBan = message.mentions.users.first();
    const banReason = args.slice(1).join(' ');
    
    if (userToBan) {
        if (userToBan.length > 2) {
            return message.channel.send(`${message.author} Invalid format. Please ban one user at a time.`);
        }
        else {
            if (message.author === userToBan) {
                return message.channel.send(`${message.author} You cannot ban yourself.`);
            }
            if (!banReason) {
                return message.channel.send(`${message.author} You must have a reason to ban!`);
            }
            else {
                await message.guild.ban(userToBan) // Bans the user
                const banConfirmationEmbed = new Discord.RichEmbed()
                .setColor('RED')
                .setDescription(`✅ ${userToBan} has been successfully banned!`);
                message.channel.send({
                embed: banConfirmationEmbed
                });
            }
        }
    } else { 
        return message.channel.send(`${message.author} Invalid format. Please put the user to be banned wrapped in double quotes, i.e. ?ban @thisUser#2131 Spam`);
    }
};


module.exports.help = {
    name:"ban"
};
