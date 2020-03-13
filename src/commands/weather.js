const Discord = require("discord.js");
const axios = require('axios');

module.exports.run = async (bot, message, args) => {
    if (args.length === 0) {
        return message.reply("Please provide a valid city");
    }
    var cityArg = message.content.match(/"(.+?)"/g);
    var city = cityArg.toString();
    city = city.replace(/"/g, "");
    city = city.replace(/ /g,"%20");
    if (city === null) {
        return message.reply("Please provide a valid city");
    } else {
        const m = await message.channel.send("Getting Weather Data...");
        const weather = axios.create({
            // Get data from weather API
            baseURL: "http://api.weatherstack.com/current?access_key=bf2f4f25be0ae02e4278f655c079cd1b&query=" + city,
            headers: {
                Accept: "application/json"
            }
        });
        weather.get("/").then(res => {
            console.log(bot.user.avatarURL);
            var iconUrl = res.data.current.weather_icons.toString().replace(/'/g, "");
            const weatherEmbed = new Discord.RichEmbed()
                .setColor('#db0000')
                .setAuthor("Current Weather Forecast", iconUrl)
                .addField("Visible Conditions:", res.data.current.weather_descriptions.toString())
                .addField("Temperature:", res.data.current.temperature.toString() + '˚C')
                .addField("Humidity", res.data.current.humidity.toString() + '%')
                .addField("Wind Speed (MPH):", res.data.current.wind_speed.toString() + " | " + res.data.current.wind_dir.toString())
                .setTimestamp()
                .setFooter('Ora', bot.user.avatarURL);
            message.channel.send(weatherEmbed);
        })
    }
}

module.exports.help = {
    name: 'weather'
};
