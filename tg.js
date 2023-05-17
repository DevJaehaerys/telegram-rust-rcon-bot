const TelegramBot = require('node-telegram-bot-api');
const {Client} = require('rustrcon');
const {ip, port, pwd, tokenBot, admins} = require("./tgconfig.json");

const rcon = new Client({
    ip: ip,
    port: port,
    password: pwd
});
const token = tokenBot;
const userIds = admins;

const bot = new TelegramBot(token, {polling: true});
rcon.login();
rcon.on('message', message => {
        userIds.forEach((userId) => {
            bot.sendMessage(userId, message.content);
        });
});

bot.on('message', (msg) => {
    const senderId = msg.chat.id.toString();
    if (userIds.includes(senderId)) {
        rcon.send(msg.text);
        console.log('Отправлена команда:', msg.text);
    }
});

bot.on('polling_error', (error) => {
    console.log(error);
});
