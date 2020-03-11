

const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const config = require("../botconfig");
const hm = require("../utils/hm.json");



function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
}

let x = 0
let guess = "";
let word = "";
var correctLetters = new Set();
var wrongLetters = new Set();
var wordLetters = new Set();
let remainingTries = 6;
let guessedLetters = [];

module.exports.run = async (bot, message, args) => {

    guess = "";
    let hmArgs = args;
    for(let i = 0; i < hmArgs.length; i++){
        let arg = hmArgs[i].replace(/"/g, "");
        hmArgs[i]=arg.toLowerCase();
    }
    if (args.length != 1) // Checks that correct number of inputs is provided
        return message.reply(" Something went wrong -- Correct syntax is ?hm <guess>\n can either be a letter in quotes or \"new\" to start new game");
    if (hmArgs[0].localeCompare("new") !=0 && hmArgs[0].length != 1)
        return message.reply(" Something went wrong -- Correct syntax is ?hm <guess>\n can either be a letter in quotes or \"new\" to start new game");
    if (word.localeCompare("") ==0 && hmArgs[0].length == 1)
        return message.reply(" Something went wrong -- Correct syntax is ?hm <guess>\n can either be a letter in quotes or \"new\" to start game over \n (Must start a new game before you can start guessing!)");

    operation = hmArgs[0].toLowerCase();
    if (operation.localeCompare("new") == 0)
    {
        correctLetters.clear();
        wrongLetters.clear();
        guessedLetters = [];
        word = hm["words"][getRandomInt(60)]
        wordLetters = new Set(word); // puts all unique letters in word in wordLetters set
        remainingTries = 6;

    }

    else
    {
        // LOSE




        //guessing letter:
        if (wordLetters.has(operation))
        {
            correctLetters.add(operation)
        }
        else
        {
            wrongLetters.add(operation)
        }

        remainingTries = 6 - wrongLetters.size

    }
        for (let i = 0; i<word.length; i++)
        {
            var letter = word.charAt(i);
            if (correctLetters.has(letter))
                guess = guess + letter;
            else
                guess = guess + "- ";
        }

    guessedLetters = Array.from(correctLetters).join(' ')+" "+Array.from(wrongLetters).join(' ')

    const exampleEmbed = new Discord.RichEmbed();
    exampleEmbed.setColor('#0099ff')


    if (correctLetters.size == wordLetters.size)
    {
        exampleEmbed.setTitle(word)
        exampleEmbed.setDescription("**YOU WIN!!!!** \nRemaining Lives: " + remainingTries + "\n Guessed Letters: " + guessedLetters)
        exampleEmbed.attachFile("./utils/hmImg/hm" + wrongLetters.size + ".png")
        exampleEmbed.setImage('attachment://hm' + wrongLetters.size +'.png');
        word = "";
    }
    else if (wrongLetters.size < 6)
    {
        exampleEmbed.setTitle(guess)
        exampleEmbed.setDescription("Remaining Lives: " + remainingTries + "\n Guessed Letters: " + guessedLetters)
        exampleEmbed.attachFile("./utils/hmImg/hm" + wrongLetters.size + ".png")
        exampleEmbed.setImage('attachment://hm' + wrongLetters.size +'.png');
    }
    else if (wrongLetters.size >= 6)
    {
        exampleEmbed.setTitle(word)
        exampleEmbed.setDescription("**GAME OVER** \nRemaining Lives: " + 0 + "\n Guessed Letters: " + guessedLetters)
        exampleEmbed.attachFile("./utils/hmImg/hm6.png")
        exampleEmbed.setImage('attachment://hm6.png');
        word = "";
    }

    message.channel.send(exampleEmbed);



}


module.exports.help = {
    name:"hm"
};
