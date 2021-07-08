import { round } from '../../code/common'
import { i24Ticker } from '../../interfaces/binance'

export const ticker24ToMessage = (ticker, rub: i24Ticker, usd: i24Ticker) => {
    
    const smile = usd.priceChange > 0 ? '🟢' : '🔴'
    let text = `${smile} ${ticker}`

    text += ticker24PriceMessage('USD', usd)
    text += ticker24PriceMessage('RUB', rub)

    return text
}

export const ticker24PriceMessage = (currency, ticker: i24Ticker) => {

    const isPositive = ticker.priceChange > 0

    const price = ticker.lastPrice < 10 ? round(ticker.lastPrice, 3) : round(ticker.lastPrice, 0)
    const changePrice = ticker.lastPrice < 100 ? round(ticker.priceChange, 4) : round(ticker.priceChange, 0)
    const changePercent = ticker.priceChangePercent < 10 ? round(ticker.priceChangePercent, 3) : round(ticker.priceChangePercent, 0)

    const priceString = `${price} ${currency}`
    const changePriceString = `${isPositive ? '+' : ''}${changePrice} ${currency}`
    const changePercentString = `${isPositive ? '+' : ''}${changePercent}%`

    const text = `\n${priceString} ${changePriceString} (${changePercentString})`

    return text
}