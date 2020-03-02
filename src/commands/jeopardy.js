const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');
var liveRound = 0;
//Usage: ?jeopardy to start jeopardy session. After 10s queue, will start with a random question and then take most recent correct's answer
//Stage 1: Asks questions and (CURRENTLY HERE) recognizes if a message contains correct answer
//Stage 3: Increments/decrements score correctly

module.exports.run = async (bot, message, args) => {
    // if(args == "" && liveRound == 0){
    //     message.channel.send(`Welcome to Jeopardy! Start/stop questions with ?jeopardy resume/pause. View scores with ?jeopardy scores. View rules with ?jeopardy rules. End the round with ?jeopardy end.`);
    //     liveRound = 1;
    // }
    // if(args == "resume" && liveRound == 1){
    //     //begin questions. RULES: First correct answer only. After 10 seconds of no correct answer, announce answer and post new category. 3s later, question..
    //     let { answer, question, value, category } = await getQuestion();
    //     answer = answer.replace(/<(?:.|\n)*?>/gm, '');
    //     answer = answer.toLowerCase();

    //     console.log(answer); //for bugtesting, remove before merging to master

    //     if (value == null) {
    //         value = 200;
    //     }

    //     message.channel.send(`The category is ${category.title} for ${value}.`);
    //     message.channel.send(question);
    //     bot.on('message',  async message => {
    //         if(message.content.toLowerCase().includes(answer)&&!message.author.bot){
    //             message.channel.send(`${message.author} is correct and receives $${value}.`);
    //         }
    //     });
    // }
    // if(args == "pause" && liveRound == 1){
    //     //pause timer
    // }
    // if(args == "end" && liveRound == 1){
    //     liveRound = 0;
    // }
    // if(args == "scores"){
    //     //print all scores for current round
    // }

//this might be cleaner with a switch
    switch(args){ //implement the question timer
        case 0:
            args = "";
            if(liveRound = 1){
                message.channel.send(`There's already a live round of Jeopardy.`);
            } else {
                message.channel.send(`Welcome to Jeopardy! Start/stop questions with ?jeopardy resume/pause. View scores with ?jeopardy scores. View rules with ?jeopardy rules. End the round with ?jeopardy end.`);
                liveRound = 1; 
            }
            break;
        case 1:
            args = "resume";
            if(liveRound = 0){
                message.channel.send(`There's no live round of Jeopardy.`);
            }
            if(liveRound = 1){
                let { answer, question, value, category } = await getQuestion();
                answer = answer.replace(/<(?:.|\n)*?>/gm, '');
                answer = answer.toLowerCase();

                console.log(answer); //for bugtesting, remove before merging to master

                if (value == null) {
                    value = 200;
                }

                message.channel.send(`The category is ${category.title} for ${value}.`);
                message.channel.send(question);
                bot.on('message',  async message => {
                    if(message.content.toLowerCase().includes(answer)&&!message.author.bot){ //need to parse optional answers and filter for question format
                        message.channel.send(`${message.author} is correct and receives $${value}.`);
                        // for(var i = 0; i < players.length; i++){ finish this for score tracking
                        //     if(players[i] = message.author)
                        // }
                        // players[playerCount] = message.author;
                    }
                });
            }
            break;
        case 2:
            args = "pause";
            //pause the question timer
            break;
        case 3:
            args = "end";
            if(liveRound == 1){
                liveRound = 0;
                message.channel.send(`Jeopardy is over. The winner is PLACEHOLDER with MONEY!`);
            } else {
                message.channel.send(`There's no live round of Jeopardy.`)
            }
            break;
        case 4:
            args = "scores";
            //return scores
            break;
        case 5:
            args = "rules";
            //explain rules
            break;
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