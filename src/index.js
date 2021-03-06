const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const TOKEN = require("./token.json");
const fs = require("fs");


const bot = new Discord.Client();
const prefix = botconfig.prefix;
var filterArgs = [];

bot.commands = new Discord.Collection();
bot.afk = new Map();
fs.readdir("./commands/", (err, files) => {

    if(err){
        console.log(err);
    }

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    if(commandFiles.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        console.log(`${file} loaded!`);

        bot.commands.set(command.help.name, command);
    }
});

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    await bot.user.setActivity("?help", {type: "Bot being developed!"});
});


bot.on('message',  async message => {
    if (message.author.bot) return;

    //loop for filter command, is essentially always on but by default the array SHOULD BE EMPTY
    //so it won't execute. To 'disable' call filter with no arguments
    for(var i = 0; i < filterArgs.length; i++){
        if(message.content.toLowerCase().includes(filterArgs[i])&&!message.author.bot){
            message.delete(0);
        }
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content.includes(message.mentions.members.first())) {
        let mentioned = bot.afk.get(message.mentions.users.first().id);
        if (mentioned) {
            message.channel.send(`**${message.mentions.members.first().nickname}** is currently afk. Reason: ${mentioned.reason}`);
        }
    }

    let afkcheck = bot.afk.get(message.author.id);

    if (afkcheck) return [bot.afk.delete(message.author.id), message.channel.send(`Welcome back ${message.author}. I removed your afk.`).then(msg => msg.delete(5000))];

    if(!message.content.startsWith(prefix)) return;

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).run(bot,message,args);
    } catch (error) {
        console.error(error);
        await message.reply('there was an error trying to execute that command!');
    }

    if(command=="filter"){
        filterArgs = args;
    }
});

bot.login(TOKEN.value);
