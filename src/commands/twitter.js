const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const fs = require("fs");
let config = require("../botconfig.json");
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'FCXWsCq8tTonwN2p3CrUmnzE3',
    consumer_secret:      'ogSnzSBVN7A44Y3quVm84NdNelilOTiTo40vR3vkqivCTyZkDS',
    access_token:         '1237635282649763840-fOYbU0A6OX2cDekcI4W1yMWxFhl9ut',
    access_token_secret:  'NtFwm5Fh87ES38VHnbtffR25n74ekXI2hEE1xTFDUZQt3',
  })
  
var followedUsers = []

module.exports.run = async (bot, message, args) => {
    args = message.content.match(/(?:[^\s"]+|"[^"]*")+/g).slice(1); //regex to parse
    if (args.length != 2) { //check to see if only one user is specified
        return message.channel.send(`${message.author} Please enter a valid command as follows: ?twitter getLastTweet "elonmusk"`);
    }
    if (args[1] != "followUser" && args[1] != "postTweet" && args[1] != "getLastTweet")
    if (args[1][0] != '"' || args[1][args[1].length - 1] != '"') { //check ot make sure the user is wrapped in double quotes, i.e. ?twitter "elonmusk"
        return message.channel.send(`${message.author} Please put the user's twitter handle wrapped in double quotes.`);
    }
    args[1] = args[1].substring(1, args[1].length - 1); //get rid of quotes
    if (args[0] == 'followUser') {
        T.get('statuses/user_timeline', { screen_name: args[1], count: 1 }, function(err, data, response) {
            if (err === undefined) {
                if (!(followedUsers.includes(data[0].user.id_str))) {
                    followedUsers.push(data[0].user.id_str); //get the user id as string for param to stream
                }
                var stream = T.stream('statuses/filter',  { follow: followedUsers })
                stream.on('tweet', function (tweet) { //stream acts as a webhook, post a tweet when seen
                    const tweetToPost = new Discord.RichEmbed()
                    .setColor('RED')
                    .setDescription(`🕊 ${tweet.user.name} : ${tweet.text} `);
                    message.channel.send({
                    embed: tweetToPost
                    })
                })
            }
            else {
                console.log(err);
            }
        })
    } 
    else if (args[0] == "postTweet") {
        T.post('statuses/update', { status: args[1] }, function(err, data, response) {
            (err === undefined) ? message.channel.send(`${message.author} Your tweet has been posted!`) : console.log (err) //provides confirmation after tweet posted
        })
    }
    else if (args[0] == "getLastTweet") {
        T.get('statuses/user_timeline', { screen_name: args[1], count: 1 }, function(err, data, response) {
            if (err === undefined) {
                if (data.length === 0) //return was empty
                    message.channel.send(`${message.author} This user does not have any tweets :(`)
                else {
                    const tweetToPost = new Discord.RichEmbed()
                    .setColor('RED')
                    .setDescription(`🕊 ${data[0].user.name} : ${data[0].text} `);
                    message.channel.send({
                    embed: tweetToPost
                    })
                }
            }
            else {
                message.channel.send(`${message.author} This user does not exist. Please enter a valid user as follows: ?twitter getLastTweet "elonmusk"`);
                console.log (err);
            }
        })
    }
};

module.exports.help = {
    name: "twitter"
};