const irc = require('irc');
const config = require('./config');
const getFirstDefinition = require('./requests/getFirstDefinition');

const { server, nick, userName, password, channels } = config.irc;
const client = new irc.Client(server, nick, {
    sasl: true,
    userName,
    password,
    channels
});

const trigger = config.bot.prefix + config.bot.command + ' ';
client.addListener('message', async function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    if (message.startsWith(trigger)) {
        const word = message.slice(trigger.length).trim();
        const result = await getFirstDefinition(word);
        if (result.found) {
            client.say(to, result.definition);
        }
        else {
            client.say(to, 'No exact matches for your query.');
        }
    }
});

