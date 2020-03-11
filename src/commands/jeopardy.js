const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');

var liveRound = 0;
var host;
var playerScores = ["Max", 0]; //very primitive, right now first entry is a tag, subsequent is their score, etc; definitely better ways to do this if i have time

module.exports.run = async (bot, message, args) => {
    if(host == null){
        host = message.author.id;
    }
    if(args == ""){ //Good for now?
        if(liveRound == 0){
            liveRound = 1;
            message.channel.send(`Welcome to Jeopardy, hosted by ${message.author}! View rules with ?jeopardy rules.`);
        }
        else if(liveRound == 1){
            message.channel.send(`There is already a live round of Jeopardy.`);
        }
    }
    if(args == "resume"){ //TODO: Timer
        if(liveRound == 0){
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
        if(liveRound == 1){
            let { answer, question, value, category } = await getQuestion();
            answer = answer.replace(/<(?:.|\n)*?>/gm, '');
            var answered = 0;
            console.log(answer); //for bugtesting, remove before merging to master

            if (value == null) {
                value = 200;
            }

            message.channel.send(`The category is ${category.title} for ${value}.`);
            message.channel.send(question);
            bot.on('message', message => { //TODO: Score parsing improvements (optional answers)
                var user = message.author.tag;
                if(message.content.toLowerCase().includes(answer.toLowerCase())&&!message.author.bot&&answered==0){
                    answered = 1;
                    for(var i = 0; i < playerScores.length; i++){
                        if(playerScores[i] == user){
                            playerScores[i+1] += value;
                        } else {
                            playerScores.push(user);
                            playerScores.push(value);
                        }
                    }
                    message.channel.send(`${message.author} is correct and receives $${value}.`);
                }
                else{
                    for(var i = 0; i < playerScores.length; i++){
                        if(playerScores[i] == user){
                            playerScores[i+1] -= value;
                        } else {
                            playerScores.push(user);
                            playerScores.push(-1*value);
                        }
                    }
                }
            });
        }
    }
    if(args == "pause"){ //finish this
        //pause timer
    }
    if(args == "end"){ //should work once scoring implemented
        if(message.author.id == host && liveRound == 1){
            liveRound = 0;
            host = null;
            var maxScore = 0;
            for(var i = 1; i < playerScores.length; i+=2){
                if(playerScores[i] > maxScore){
                    maxScore = i;
                }
            }
            var victoryMessage = "Jeopardy is over. The winner is " + playerScores[maxScore-1] + " with $" + playerScores[maxScore] +"!";
            message.channel.send(victoryMessage);
        } 
        else{
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
    }
    if(args == "scores"){
        //print score array
    }
    if(args == "rules"){
        message.channel.send(`Start/stop questions with ?jeopardy resume/pause. View current scores with ?jeopardy scores. The host or an admin can end the round with ?jeopardy end.`);
    }
};

module.exports.help = {
    name:"jeopardy"
};

async function getQuestion() {
    // fetch question from jservice.io
    const url = 'http://www.jservice.io/api/random';
    let result = JSON.parse((await get(url)).text)[0];
    if (result.question == 'null') { //just in case the question's bugged, recursively pull one that isn't (DOESNT WORK)
        result = getQuestion();
    }
    return result;
}