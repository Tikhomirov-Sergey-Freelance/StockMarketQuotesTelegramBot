import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../code/bot'
import Binance from '../../code/binance'
import { ticker24ToMessage } from './parser'
import { iResult } from '../../interfaces/common'
import { i24Ticker } from '../../interfaces/binance'

export const tickerAction = async (message: TelegramBot.Message, [source, ticker]: RegExpExecArray) => {

    const chatId = message.chat.id

    ticker = ticker.trim().toUpperCase()

    if(!ticker) {
        return BotProwider.bot.sendMessage(chatId, 'Чтобы получить курс интересующей криптовалюты, пожалуйста, перечислите тикеры через запятую\nПопулярные тикеры: BTC, ETH, XRP, ADA, DOGE')
    }
    
    const waitMessage = await BotProwider.bot.sendMessage(chatId, 'Cпасибо за запрос!!!\nЗагружаю...')
    
    const tickersSymbols = ticker.split(',').map(ticker => ticker.trim())
    const tickers = await Promise.all(tickersSymbols.map(symbol => Binance.ticker24(symbol)))
    
    BotProwider.bot.deleteMessage(chatId, waitMessage.message_id.toString())

    const allErrors = tickers.every(result => result.error)

    if(allErrors) {
        return BotProwider.bot.sendMessage(chatId, 'Упс, не нашел тикеры:((\nПожалуйста, проверье правильность')
    }

    const withErrors = tickers.filter(result => result.error)

    if(withErrors.length) {

        const pluralSymbol = withErrors.length === 1 ? '' : 'ы'
        const tickers = withErrors.map(ticker => ticker.ticker).join(', ')
        
        await BotProwider.bot.sendMessage(chatId, `Упс, тикер${pluralSymbol} ${tickers} не удалось найти :((`)
    }

    return tickers.map(ticker => {

        const text = ticker24ToMessage(ticker.ticker, ticker.result.rub, ticker.result.usd)
        return BotProwider.bot.sendMessage(chatId, text)
    })
}