const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const {get} = require('snekfetch');

var players = [];
var scores = [];
var arbitraryJeopardyVariable = 0;
//Usage: ?jeopardy to start jeopardy session. After 10s queue, will start with a random question and then take most recent correct's answer
//Stage 1: Asks questions and (CURRENTLY HERE) recognizes if a message contains correct answer
//Stage 2: Only recognizes questions from opted-in users ($jeopardy join/quit), tracks winner for picking category.
//Stage 3: Increments/decrements score correctly

module.exports.run = async (bot, message, args) => {
    if(args == "" && arbitraryJeopardyVariable == 0){
        message.channel.send(`Jeopardy round hosted by ${message.author.tag}. Anyone can opt-in/out with $jeopardy join/quit. The host can start/end with $jeopardy start/end.`);
        arbitraryJeopardyVariable = 1;
    }
    if(args == "start" && arbitraryJeopardyVariable == 1){
        //begin questions. RULES: First correct answer only. After 10 seconds of no correct answer, announce answer and post new category. 3s later, question..
        let { answer, question, value, category } = await getQuestion();
        answer = answer.replace(/<(?:.|\n)*?>/gm, '');

        console.log(answer); //for bugtesting

        if (value == null) {
            value = 200;
        }
        message.channel.send(`The category is ${category.title} for ${value}.`);
        message.channel.send(question);
    }
    if(args == "end" && arbitraryJeopardyVariable == 1){
        arbitraryJeopardyVariable = 0;
    }
    if(args == "join"){
        //add member to list of members to recieve answers from
    }
    if(args == "quit"){
        //remove member from answer list of they are in it
    }
    if(args == "scores"){
        //print all scores for current round
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