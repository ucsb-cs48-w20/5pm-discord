const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const fs = require("fs");
let config = require("../botconfig.json");
var Twit = require('twit');

module.exports.help = {
    name: "twitter"
};