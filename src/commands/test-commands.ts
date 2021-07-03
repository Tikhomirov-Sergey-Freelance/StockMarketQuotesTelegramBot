import BotProwider from '../code/bot'

export default () => {

    BotProwider.bot.on('message', message => {

        const chatId = message.chat.id
        BotProwider.bot.sendMessage(chatId, message.text)
    })
}