import * as TelegramBot from 'node-telegram-bot-api'

class BotProwider {

    static bot: TelegramBot

    static async sendMessageAndDeleteCallback(message: TelegramBot.Message, text, options?: TelegramBot.SendMessageOptions) {

        const chatId = message.chat.id
        const waitMessage = await this.bot.sendMessage(chatId, text, options)

        return () => {
            return BotProwider.bot.deleteMessage(chatId, waitMessage.message_id.toString())
        }
    }
}

export default BotProwider