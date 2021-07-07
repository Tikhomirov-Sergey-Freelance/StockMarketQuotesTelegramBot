import BotProwider from '../../code/bot'
import { tickerAction } from './actions'

export default () => {

    BotProwider.bot.onText(/\/ticker *(.*)/, (message, match) => {
        tickerAction(message, match)
    })

}