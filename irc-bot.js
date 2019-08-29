const irc = require('irc');
const request = require('request');
const config = require('./config');


const { server, nick, userName, password, channels } = config.irc;
const client = new irc.Client(server, nick, {
    sasl: true,
    userName,
    password,
    channels
});

const trigger = config.bot.prefix + config.bot.command + ' ';
client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    if (message.startsWith(trigger)) {
        const result = message.slice(trigger.length).trim();
        client.say(to, '<insert lexico result for "' + result + '" here>');
    }
});

