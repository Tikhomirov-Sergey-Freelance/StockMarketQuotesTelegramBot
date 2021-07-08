import BotProwider from '../../code/bot'
import { TICKER_INLINE_KEYBOARD } from '../../constants/ticker'
import { tickerAction } from './actions/ticker24'
import { showFavoritesAction } from './actions/favorites'
import { favoriteCallbackQuery } from './query-callbacks'

export default () => {

    BotProwider.bot.onText(/\/ticker *(.*)/, (message, match) => {
        tickerAction(message, match)
    })

    BotProwider.bot.on('callback_query', query => {

        const data = JSON.parse(query.data)

        switch (data.type) {

            case TICKER_INLINE_KEYBOARD.TOOGLE_FAVORITE:
                favoriteCallbackQuery(query, data) 
                break
        }

    })

    BotProwider.bot.onText(/Избранные тикеры/, (message) => {
        showFavoritesAction(message)
    })
}