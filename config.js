const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    irc: {
        server: process.env.IRC_SERVER || 'irc.freenode.net',
        nick: process.env.IRC_NICK,
        userName: process.env.IRC_USERNAME,
        password: process.env.IRC_PASS,
channels: process.env.IRC_CHANS.split(',')
    },
    bot: {
        prefix: process.env.BOT_PREFIX || '!',
        command: process.env.BOT_COMMAND || 'lexico'
    }
};
