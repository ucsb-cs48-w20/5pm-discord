const fs = module.require('fs');
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    // Check perms, self, rank, etc
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have Permission to unmute!');
    const toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send('You did not specify a user mention or ID!');
    if (toMute.id === message.author.id) return message.channel.send('You can not unmute yourself!');
    if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send('You can not unmute a member that is equal to or higher than yourself!'); 

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.find(mR => mR.name === 'Muted');
    if (!mutedRole) return message.channel.send("Muted role has not been created!");

    // If the mentioned user already has the "mutedRole" then that can not be muted again
    if (!toMute.roles.has(mutedRole.id)) return message.channel.send('This user is already unmuted!');
    else{
        toMute.removeRole(mutedRole);
        message.reply(`<@${toMute.id}> has been unmuted`);
    }

};

module.exports.help = {
    name: 'unmute'
};