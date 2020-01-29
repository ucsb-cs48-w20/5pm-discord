const Discord = require("discord.js");
const errors = require("../utils/errors.js");

const optionEmojis = [
    '🇦',
    '🇧',
    '🇨',
    '🇩',
    '🇪',
    '🇫',
    '🇬',
    '🇭',
    '🇮',
    '🇯',
    '🇰',
    '🇱',
    '🇲',
    '🇳',
    '🇴',
    '🇵',
    '🇶',
    '🇷',
    '🇸',
    '🇹',
    '🇺',
    '🇻',
    '🇼',
    '🇽',
    '🇾',
    '🇿',
];




module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return errors.noPerms(message, "Moderator Role Needed")
    }

    args = message.content.match(/"(.+?)"/g);

    if (args) {
        if (args.length === 1){
            // yes or no questions
            const question = args[0].replace(/"/g, '');
            let pollEmbed = new Discord.RichEmbed()
                .setColor('#db0000')
                .setTitle(`Poll`)
                .setDescription(`${message.author} asks: ${question}`);
            return message
                .channel
                .send(pollEmbed)
                .then(async (pollMessage) => {
                    await pollMessage.react('👍');
                    await pollMessage.react('👎');
                    await pollMessage.react('🤷‍♂️');
                });
        } else {
            // multiple choice questions
            args = args.map(a => a.replace(/"/g, ''));
            const question = args[0];
            const questionOptions = [...new Set(args.slice(1))];
            if (questionOptions > 20){
                return message.channel.send(`${message.author} Polls are limited to 20 options`);
            } else {
                let pollEmbed = new Discord.RichEmbed()
                    .setColor('#db0000')
                    .setTitle(`Poll`)
                    .setDescription(`${message.author} asks: ${question}\n 
${questionOptions.map((option, i) => `${optionEmojis[i]} - ${option}`).join('\n\n')}`);
                return message
                    .channel
                    .send(pollEmbed)
                    .then(async (pollMessage) => {
                        for (let i = 0; i < questionOptions.length; i++) {
                            await pollMessage.react(optionEmojis[i]);
                        }
                    });
                }
        }
    } else {
        return message.channel.send(`${message.author} invalid format. Question and options need to be wrapped in double quotes.`);
    }
};

module.exports.help = {
    name:"poll"
};
