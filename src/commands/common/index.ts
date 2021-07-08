import BotProwider from '../../code/bot'
import { startAction, helpAction } from './actions'

export default () => {

    BotProwider.bot.onText(/\/start/, (message) => {
        startAction(message)
    })

    BotProwider.bot.onText(/\/help/, (message) => {
        helpAction(message)
    })
}