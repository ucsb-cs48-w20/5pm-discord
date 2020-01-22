const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const TOKEN = require("./token.json");
const fs = require("fs");


const bot = new Discord.Client();
const prefix = botconfig.prefix;

bot.commands = new Discord.Collection();

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

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).run(bot,message,args);
    } catch (error) {
        console.error(error);
        await message.reply('there was an error trying to execute that command!');
    }

});

bot.login(TOKEN.value);
