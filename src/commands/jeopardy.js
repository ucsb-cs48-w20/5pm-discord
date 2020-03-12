const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');

var liveRound = 0;
var host;
var jeopardyChannel;
var players = [];
var scores = [];
var playerIds = [];

module.exports.run = async (bot, message, args) => {
    var argument = args.toString().replace(/"/gm,""); //causes a lot of errors but necessary for arg parsing
    if(host == null && jeopardyChannel == null){
        host = message.author;
        jeopardyChannel = message.channel;
    }
    if(argument == "" && message.channel == jeopardyChannel){ //Good for now
        if(liveRound == 0){
            liveRound = 1;
            players = [];
            scores = [];
            playerIds = [];
            message.channel.send(`Welcome to Jeopardy, hosted by ${message.author}! View rules with ?jeopardy "rules".`);
        }
        else if(liveRound == 1){
            message.channel.send(`There is already a live round of Jeopardy.`);
        }
    }
    if(argument == "next" && message.channel == jeopardyChannel){ //TODO: Timer
        if(liveRound == 0){
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
        if(liveRound == 1 && message.author == host){
            let { answer, question, value, category } = await getQuestion();
            answer = answer.replace(/<(?:.|\n)*?>/gm, '');
            var answered = 0;
            console.log(answer); //for bugtesting, remove before merging to master

            if (value == null) {
                value = 200;
            }

            message.channel.send(`The category is ${category.title} for ${value}.`);
            message.channel.send(question);
            bot.on('message', message => { //TODO: Score parsing improvements (optional answers) and multiple/answers and plural answers, ONLY SEARCH IN CHANNEL
                if(message.channel == jeopardyChannel){
                    if(!message.author.bot&&answered==0&&message.content.toLowerCase().includes(answer.toLowerCase())&&message.content.toLowerCase().includes("ora, w" || "ora, how" || "ora w" || "ora how")){ //won't accept ora w answers atm
                        //correct, question not answered
                        answered = 1;
                        message.channel.send(`${message.author} is correct and receives $${value}. ${host} can queue the next question with ?jeopardy "next".`);
                        if(playerExists(message.author)==0){
                            players[Number(message.author.id)] = message.author;
                            scores[Number(message.author.id)] = value;
                            playerIds.push(Number(message.author.id));
                        } else if(playerExists(message.author)==1){
                            scores[Number(message.author.id)] += value;
                        }
                    } else if(!message.author.bot&&answered==0&&message.content.toLowerCase().includes("ora, w" || "ora, how" || "ora w" || "ora how")&&!message.content.toLowerCase().includes(answer.toLowerCase())){
                        //incorrect, question not answered
                        if(playerExists(message.author)==0){
                            players[Number(message.author.id)] = message.author;
                            scores[Number(message.author.id)] = -1*value;
                            playerIds.push(Number(message.author.id));
                        } else if(playerExists(message.author)==1){
                            scores[Number(message.author.id)] -= value;
                        }
                    } else if(!message.author.bot&&answered==1&&message.content.toLowerCase().includes("ora, w" || "ora, how"|| "ora w" || "ora how")){
                        //question answered (BUGGED)
                        //message.channel.send(`The question has been answered. ${host} can queue another one with ?jeopardy next.`);
                    }
                }
            });
        }
    }
    if(argument == "end" && message.channel == jeopardyChannel) {
        if(message.author == host && liveRound == 1){
            liveRound = 0;
            host = null;
            jeopardyChannel = null;
            var maxScore = -99999;
            var winner;
            message.channel.send("Jeopardy is over. The scores are:")
            for (let index = 0; index < playerIds.length; index++) {
                message.channel.send(`${players[Number(playerIds[index])]} with $${scores[Number(playerIds[index])]}.`);
                if(Number(scores[Number(playerIds[index])]) > maxScore) {
                    maxScore = scores[Number(playerIds[index])];
                    winner = players[Number(playerIds[index])];
                }
            }
            message.channel.send(`The winner is ${winner} with $${maxScore}!`);
        } 
        else{
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
    }
    if(argument == "scores" && message.channel == jeopardyChannel){ //fix this
        for (let index = 0; index < playerIds.length; index++) {
            message.channel.send(`${players[Number(playerIds[index])]} has $${scores[Number(playerIds[index])]}.`);
        }
    }
    if(argument == "rules" && message.channel == jeopardyChannel){
        message.channel.send(`Answers must be in the format of "Ora, what is..." View scores with ?jeopardy "scores". The host queues the next question with ?jeopardy "next" and end the round with ?jeopardy "end". Currently, only one jeopardy instance can function at a time.`);
    }
};

module.exports.help = {
    name:"jeopardy"
};

async function getQuestion() {
    // fetch question from jservice.io
    const url = 'http://www.jservice.io/api/random';
    let result = JSON.parse((await get(url)).text)[0];
    if (result.question == 'null' || result.question == '' || result.question == null) { 
        result = getQuestion();
    }
    return result;
}

function playerExists(player){ //returns 1 if player is already in players[]
    if(players[Number(player.id)] == null){
        return 0;
    }
    return 1;
}