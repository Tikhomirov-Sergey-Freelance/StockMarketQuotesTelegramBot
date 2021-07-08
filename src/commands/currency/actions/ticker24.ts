import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../../code/bot'
import Binance from '../../../code/binance'
import { ticker24ToMessage } from '../parser'
import { investingLinkNews } from '../../../code/links'
import { TICKER_INLINE_KEYBOARD } from '../../../constants/ticker'
import { prepareTickers } from '../../../code/tickers'
import UserHelper from '../../../models/user/helper'

export const tickerAction = async (message: TelegramBot.Message, [source, tickersString]: RegExpExecArray) => {

    const chatId = message.chat.id
    const telegramId = message.from.id

    const tickersSymbols = prepareTickers(tickersString)

    if(!tickersSymbols.length) {
        return helpTicker24(message)
    }
    
    const deleteWaitMessage = await BotProwider.sendMessageAndDeleteCallback(message, 'Cпасибо за запрос!!!\nЗагружаю...')
    
    let tickers = await Promise.all(tickersSymbols.map(symbol => Binance.ticker24(symbol)))

    tickers = await sendTickers24Errors(message, tickers)

    const favoriteTickers = (await UserHelper.favoriteTickers(telegramId)).result
    deleteWaitMessage()

    tickers.map(ticker => {

        const isFavorite = favoriteTickers.some(favoriteTicker => ticker.ticker === favoriteTicker)
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
                            text: isFavorite ? 'Удалить из избранного' : 'В избранное',
                            callback_data: JSON.stringify({ type: TICKER_INLINE_KEYBOARD.TOOGLE_FAVORITE, addFavorite: !isFavorite, ticker: ticker.ticker })
                        }
                    ]
                ]
            }
        })
    })
}

export const helpTicker24 = (message: TelegramBot.Message) => {
    const chatId = message.chat.id
    return BotProwider.bot.sendMessage(chatId, 'Чтобы получить курс интересующей криптовалюты, пожалуйста, введите команду /ticker и перечислите тикеры через запятую\nПопулярные тикеры: BTC, ETH, XRP, ADA, DOGE')
}

const sendTickers24Errors = async (message: TelegramBot.Message, tickers) => {

    const chatId = message.chat.id

    const allErrors = tickers.every(result => result.error)

    if(allErrors) {
        await BotProwider.bot.sendMessage(chatId, 'Не нашел тикеры:((\nПожалуйста, проверьте правильность ввода')
        return []
    }

    const withErrors = tickers.filter(result => result.error)

    if(withErrors.length) {

        const pluralSymbol = withErrors.length === 1 ? '' : 'ы'
        const tickers = withErrors.map(ticker => ticker.ticker).join(', ')
        
        await BotProwider.bot.sendMessage(chatId, `Тикер${pluralSymbol} ${tickers} не удалось найти :((`)
    }

    return tickers.filter(ticker => !ticker.error)
}