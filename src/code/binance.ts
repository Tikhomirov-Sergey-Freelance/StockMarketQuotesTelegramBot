import request from './request'
import { i24Ticker } from '../interfaces/binance'

export default class {

    private static apiUrl = 'https://api.binance.com/api'

    static async ticker24(symbol: string) {

        let url = `${this.apiUrl}/v3/ticker/24hr`

        const rubUrl = `${url}?symbol=${symbol}RUB`
        const usdUrl = `${url}?symbol=${symbol}BUSD`

        const rubRequest = request<i24Ticker>(rubUrl)
        const usdRequest = request<i24Ticker>(usdUrl)

        const [rubResponce, usdResponce] = await Promise.all([rubRequest, usdRequest])

        if (rubResponce.error || usdResponce.error) {
            return { ticker: symbol, error: rubResponce.error || usdResponce.error }
        }

        return {
            ticker: symbol,
            result: {
                rub: rubResponce.result,
                usd: usdResponce.result
            }
        }
    }
}