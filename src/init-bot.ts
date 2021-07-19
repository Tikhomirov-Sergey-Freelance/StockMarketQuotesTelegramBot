import * as TelegramBot from 'node-telegram-bot-api'

import { telegramToken } from './configs/tokens'
import BotProwider from './code/bot'

export default async () => {
    
    BotProwider.bot = new TelegramBot(telegramToken, {
        polling: {
            interval: 300,
            autoStart: true,
            params: {
                timeout: 10
            }
        }
    })

    BotProwider.bot.on('polling_error', async () => {
        await BotProwider.bot.stopPolling()
        BotProwider.bot.startPolling()
    })

    BotProwider.listener.listenMessages()
}