const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
//Usage: ?filter arg1 arg2 arg3...
//case-agnostic args, ?filter with no args to reset
//no memory of keywords so resets every time its called, could change?
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return errors.noPerms(message, "Manage messages");
    }
    filterArgs = args;
    for(i = 0; i < filterArgs.length; i++){
        arg = filterArgs[i].replace(/"/g, "");
        filterArgs[i]=arg.toLowerCase();
    }
    var filterMessage = "You're not allowed to say: ";
    if(filterArgs.length==0){
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
