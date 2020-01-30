const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return errors.noPerms(message, "Manage messages");
    }
    filterArgs = args;
    var filterMessage = "You're not allowed to say: ";
    if(filterArgs===undefined){
        filterMessage = "Filter disabled.";
    }
    else if(filterArgs.length==1){
        filterMessage += filterArgs[0];
    }
    else{
        for(i = 0; i < filterArgs.length-1; i++){
            filterMessage += filterArgs[i];
            filterMessage += ", ";
        }
        filterMessage += "or " + filterArgs[filterArgs.length-1];
    }
    return message.channel.send(filterMessage);
};

module.exports.help = {
    name:"filter"
};
