const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const channelToken = process.env.CHANNEL_BOT_TOKEN
const chatToken = process.env.CHAT_BOT_TOKEN

const channelBot = new TelegramBot(channelToken, {polling: true});
const chatBot = new TelegramBot(chatToken, {polling: true});

channelBot.on('channel_post', msg => {
    console.log(msg)
    if (msg.caption.toLowerCase.includes('#арт')) {
        channelBot.downloadFile(msg.photo[3].file_id, './Portfolio')
    }
})

chatBot.on('message', msg => {
    console.log(msg)
})