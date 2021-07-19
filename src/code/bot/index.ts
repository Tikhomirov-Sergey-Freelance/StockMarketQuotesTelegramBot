import * as TelegramBot from 'node-telegram-bot-api'
import listener from './listener'
import { iListener } from './interfaces'

class BotProwider {

    static bot: TelegramBot
    static listener = new listener()

    static async sendMessageAndDeleteCallback(message: TelegramBot.Message, text, options?: TelegramBot.SendMessageOptions) {

        const chatId = message.chat.id
        const waitMessage = await this.bot.sendMessage(chatId, text, options)

        return () => {
            return BotProwider.bot.deleteMessage(chatId, waitMessage.message_id.toString())
        }
    }

    static async listenMessage(action: iListener) {
        this.listener.addListener(action)
    }
}

export default BotProwider