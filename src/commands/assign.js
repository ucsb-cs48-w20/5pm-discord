
// Code for assign command of Discord Bot. ?Assign allows for any user to add or remove any of the available roles.  

const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
 

module.exports.run = async (bot, message, args) => {


	if (args.length != 1) // Checks that correct number of inputs is provided
		return message.reply(" Something went wrong -- To change your role use \"?assign [+/-]<role>\"");

	operation = args[0].charAt(0);
	roleName = args[0].substring(1);

	if (operation != "+" && operation != "-") // Checks that correct format of inputs is provided
		return message.reply(" Something went wrong -- To change your role use \"?assign [+/-]<role>\"");
	
	let role = message.guild.roles.find(x => x.name.localeCompare(roleName) == 0);

	if (role == null) // Checks if role exists in server
		return message.reply(" The role: \""+ roleName +"\" does not exist.");


	let user = message.guild.member(message.author)


	if (operation == "+") // Adding roles
	{
		if (!user.roles.has(role.id))
		{
			user.addRole(role.id)
			return message.reply(" The following role as been assigned: " + role.name)
		}
		else
			return message.reply(" You already has the role: " + role.name)
	}

	if (operation == "-") // removing roles
	{
		if (user.roles.has(role.id))
		{
			user.removeRole(role.id)
			return message.reply(" The following role as been unassigned: " + role.name)
		}
		else
			return message.reply(" You do not have the role: " + role.name)
	}



};

module.exports.help = {
    name:"assign"
};