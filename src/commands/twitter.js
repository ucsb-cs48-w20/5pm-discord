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

module.exports.run = async (bot, message, args) => {
    followedUsers = [] //only one user can be specified for now
    args = message.content.match(/(?:[^\s"]+|"[^"]*")+/g).slice(1);
    if (args.length != 2) { //check to see if only one user is specified
        return message.channel.send(`${message.author} Please enter a valid command as follows: ?twitter getLastTweet "elonmusk"`);
    }
    if (args[1] != "followUser" && args[1] != "postTweet" && args[1] != "getLast5Tweets")
    if (args[1][0] != '"' || args[1][args[1].length - 1] != '"') { //check ot make sure the user is wrapped in double quotes, i.e. ?twitter "elonmusk"
        return message.channel.send(`${message.author} Please put the user's twitter handle wrapped in double quotes.`);
    }
    args[1] = args[1].substring(1, args[1].length - 1); //get rid of quotes
    if (args[0] == 'followUser') { //if command is to follow a user
        T.get('statuses/user_timeline', { screen_name: args[1], count: 1 }, function(err, data, response) {
            if (err === undefined) {
                console.log(data[0].user.id_str)
                var stream = T.stream('statuses/filter',  { follow: data[0].user.id_str })

                stream.on('tweet', function (tweet) {
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
};

module.exports.help = {
    name: "twitter"
};