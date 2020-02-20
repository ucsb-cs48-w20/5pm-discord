
// Code for assign command of Discord Bot. ?Assign allows for any user to add or remove any of the available roles.  

const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const jokeList = require("../utils/jokeList.json");
 

module.exports.run = async (bot, message, args) => {

	function getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	if (args.length != 0) // Checks for correct input. Returns snarky comment if not
	{
		x = getRandomInt(10)
		return message.reply(jokeList["badParameters"][x]+"\n (The correct syntax is just ?joke)");
	}

	return message.reply(jokeList["jokePreface"][getRandomInt(10)]+":\n\n"+jokeList["jokeBody"][getRandomInt(30)]);


};

module.exports.help = {
    name:"joke"
};