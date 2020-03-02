const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');
var liveRound = 0;

module.exports.run = async (bot, message, args) => {
    if(args == ""){ //Good for now?
        if(liveRound == 0){
            message.channel.send(`Welcome to Jeopardy, hosted by ${message.author}! Start/stop questions with ?jeopardy resume/pause. View scores with ?jeopardy scores. View rules with ?jeopardy rules. The host can end the round with ?jeopardy end.`);
            var host = message.author;
            var players = [];
            var scores = [];
            var playerCount = 0;
            liveRound = 1;
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
            answer = answer.replace(/<(?:.|\n)*?>/gm, '').toLowerCase();

            console.log(answer); //for bugtesting, remove before merging to master

            if (value == null) {
                value = 200;
            }

            message.channel.send(`The category is ${category.title} for ${value}.`);
            message.channel.send(question);
            bot.on('message',  async message => { //TODO: Score parsing improvements (optional answers), Score Tracking
                if(message.content.toLowerCase().includes(answer)&&!message.author.bot){
                    message.channel.send(`${message.author} is correct and receives $${value}.`);
                }
            });
        }
    }
    if(args == "pause"){ //finish this
        //pause timer
    }
    if(args == "reset"){//FOR TESTING, REMOVE BEFORE MASTER MERGE
        liveRound = 0;
    }
    if(args == "end"){ //finish this, bugged pretty hard rn
        //if(message.author == host){
            if(liveRound == 1){
                liveRound = 0;
                var maxScore = 0;
                for(var i = 0; i < scores.length; i++){
                    if(scores[i] > maxScore){
                        maxScore = i;
                    }
                }
                message.channel.send(`Jeopardy is over. The winner is ${players[maxScore]} with $${scores[maxScore]}!`)
            }
        //} 
        else{
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
    }
    if(args == "scores"){
        //print all scores for current round
    }
    if(args == "rules"){
        //print rules
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