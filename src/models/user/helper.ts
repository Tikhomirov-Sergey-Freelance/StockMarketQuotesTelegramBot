import Schema, { iUser } from '.'
import { mongooseRequest } from '../../code/mongoose-request'

export default class UserHelper {

    static toggleFavorite(telegramId: number, tickers: string[], mode: 'add' | 'remove' = 'add') {

        return mongooseRequest(async () => {

            let { result: user } = await this.findUserById(telegramId)

            if(!user) {

                if(mode === 'add') {
                    await new Schema({ telegramId, favoriteTickers: tickers }).save()
                }

                return true
            }
            
            if(mode === 'add') {
                user.favoriteTickers.push(...tickers)
                user.favoriteTickers = [...new Set(user.favoriteTickers)]
            } else {
                user.favoriteTickers = user.favoriteTickers.filter(ticker => !tickers.some(removingTicker => removingTicker === ticker))
            }

            await user.save()
            return true
        })
    }

    static favoriteTickers(telegramId: number) {
        return mongooseRequest<string[]>(async () => {
            let { result: user } = await this.findUserById(telegramId)
            return user ? user.favoriteTickers : []
        })
    }

    static findUserById(telegramId: number) {

        return mongooseRequest(async () => {
            return Schema.findOne({ telegramId })
        })
    }
}