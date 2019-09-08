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

        let response = '';

        if (result.found) {
            response += result.definition;
            if (result.multiple) {
                response += '\n[More than one definition exists.]';
            }
        }
        else {
            response = '[No exact matches for your query.]';
        }

        client.say(to, response);

    }
});

