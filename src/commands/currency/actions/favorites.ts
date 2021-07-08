import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../../code/bot'
import Binance from '../../../code/binance'
import { ticker24ToMessage } from '../parser'
import { investingLinkNews } from '../../../code/links'
import { TICKER_INLINE_KEYBOARD } from '../../../constants/ticker'
import { prepareTickers } from '../../../code/tickers'
import UserHelper from '../../../models/user/helper'

export const showFavoritesAction = async (message: TelegramBot.Message) => {

    const chatId = message.chat.id
    const telegramId = message.from.id

    const deleteWaitMessage = await BotProwider.sendMessageAndDeleteCallback(message, 'Cпасибо за запрос!!!\nЗагружаю...')

    const favoriteTickers: string[] = (await UserHelper.favoriteTickers(telegramId)).result

    if (!favoriteTickers.length) {

        deleteWaitMessage()
        BotProwider.bot.sendMessage(chatId, 'Ваш список избранных тикеров пустой.\nВоспользуйтесь командой команду /ticker и перечислите интересующие тикеры через запятую\nПопулярные тикеры: BTC, ETH, XRP, ADA, DOGE')
    }

    const tickers = await Promise.all(favoriteTickers.map(symbol => Binance.ticker24(symbol)))

    deleteWaitMessage()

    return tickers.map(ticker => {

        const text = ticker24ToMessage(ticker.ticker, ticker.result.rub, ticker.result.usd)

        return BotProwider.bot.sendMessage(chatId, text, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Новости',
                            url: investingLinkNews(ticker.ticker)
                        }
                    ],
                    [
                        {
                            text: 'Удалить из избранного',
                            callback_data: JSON.stringify({ type: TICKER_INLINE_KEYBOARD.TOOGLE_FAVORITE, addFavorite: false, ticker: ticker.ticker })
                        }
                    ]
                ]
            }
        })
    })
}