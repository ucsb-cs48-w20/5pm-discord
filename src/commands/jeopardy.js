const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');

var liveRound = 0;
var host;
var players = [];
var scores = [];

module.exports.run = async (bot, message, args) => {
    if(host == null){
        host = message.author.id;
    }
    if(args == ""){ //Good for now
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
            bot.on('message', message => { //TODO: Score parsing improvements (optional answers), score tracking
                if(message.content.toLowerCase().includes(answer.toLowerCase())&&!message.author.bot&&answered==0
                &&message.content.toLowerCase().includes("ora, what" || "ora, who" || "ora, where" || "ora, when"|| "ora, how"|| "ora, why")){
                    //correct
                    answered = 1;
                    message.channel.send(`${message.author} is correct and receives $${value}.`);
                    if(playerExists(message.author)==0){
                        players[Number(message.author.id)] = message.author;
                        scores[Number(message.author.id)] = value;
                    } else if(playerExists(message.author)==1){
                        scores[Number(message.author.id)] += value;
                    }
                }
                else if(message.content.toLowerCase().includes("ora, what" || "ora, who" || "ora, where" || "ora, when"|| "ora, how"|| "ora, why")){
                    //incorrect
                    if(playerExists(message.author)==0){
                        players[Number(message.author.id)] = message.author;
                        scores[Number(message.author.id)] = -1*value;
                    } else if(playerExists(message.author)==1){
                        scores[Number(message.author.id)] -= value;
                    }
                }
            });
        }
    }
    if(args == "pause"){ //finish this
        //pause timer
    }
    if(args == "end"){ //WHAT WORKS: Host check, round check WHAT DOESN'T: Max score search (score array broken?)
        if(message.author.id == host && liveRound == 1){
            liveRound = 0;
            host = null;
            var maxScore = -99999; //there's no way someone can score lower than this, right?
            for(let i = 0; i < scores.length; i++){
                if(scores[i] > maxScore){
                    maxScore = i;
                }
            }
            var victoryMessage = "Jeopardy is over. The winner is " + players[maxScore] + " with $" + scores[maxScore] +"!";
            message.channel.send(victoryMessage);
        } 
        else{
            message.channel.send(`There isn't a live round of Jeopardy. Start one with ?jeopardy.`);
        }
    }
    if(args == "scores"){ //fix this
        message.channel.send(scores[Number(message.author.id)]);
    }
    if(args == "rules"){
        message.channel.send(`Answers must be in the format of "Ora, what is ____." Start/stop questions with ?jeopardy resume/pause. View current scores with ?jeopardy scores. The host or an admin can end the round with ?jeopardy end.`);
    }
};

module.exports.help = {
    name:"jeopardy"
};

async function getQuestion() {
    // fetch question from jservice.io
    const url = 'http://www.jservice.io/api/random';
    let result = JSON.parse((await get(url)).text)[0];
    if (result.question == 'null' || result.question == '') {
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