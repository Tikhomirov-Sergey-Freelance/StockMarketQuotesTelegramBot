import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../code/bot'
import { keyboards } from '../../keyboards'

export const startAction = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const text = `Привет!\nЧтобы получить курс интересующей криптовалюты, введите команду /ticker и перечислите тикеры через запятую\nПопулярные тикеры: BTC, ETH, XRP, ADA, DOGE`
    return BotProwider.bot.sendMessage(chatId, text, {
            reply_markup: {
                keyboard: keyboards.home
            }
        })
}

export const helpAction = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    const text = `Чтобы получить курс интересующей криптовалюты, введите команду /ticker и перечислите тикеры через запятую\nПопулярные тикеры: BTC, ETH, XRP, ADA, DOGE`
    return BotProwider.bot.sendMessage(chatId, text, {
        reply_markup: {
            keyboard: keyboards.home
        }
    })
}