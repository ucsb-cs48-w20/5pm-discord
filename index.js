const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const TOKEN = require("./token.json");
const fs = require("fs");


const bot = new Discord.Client();

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err){
        console.log(err);
    }

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


bot.on('ready', async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("?help", {type: "Bot being developed!"});
});

bot.on('message', async msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
        msg.channel.send('pong');
    }
});
bot.login(TOKEN.value);
