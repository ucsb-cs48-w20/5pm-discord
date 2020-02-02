const fs = module.require('fs');
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
    // Check perms, self, rank, etc
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have Permission to mute!');
    const toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!toMute) return message.channel.send('You did not specify a user mention or ID!');
    if (toMute.id === message.author.id) return message.channel.send('You can not mute yourself!');
    if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send(toMute.highestRole.postion + " " + message.member.highestRole.position);
    // message.channel.send('You can not mute a member that is equal to or higher than yourself!'); 

    // Check if the user has the mutedRole
    let mutedRole = message.guild.roles.find(mR => mR.name === 'Muted');

    // If the mentioned user does not have the muted role execute the following
    if (!mutedRole) {
        try {
            // Create a role called "Muted"
            mutedRole = await message.guild.createRole({
                name: 'Muted',
                color: 'RED',
                permissions: []
            });

            // Prevent the user from sending messages or reacting to messages
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(mutedRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    // If the mentioned user already has the "mutedRole" then that can not be muted again
    if (toMute.roles.has(mutedRole.id)) return message.channel.send('This user is already muted!');

    // Add the mentioned user to the "mutedRole" and notify command sender
    await toMute.addRole(mutedRole.id);
    message.reply(`<@${toMute.id}> has been muted`);

};

module.exports.help = {
    name: 'mute'
};