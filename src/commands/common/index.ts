import BotProwider from '../../code/bot'
import { startAction, helpAction, backAction } from './actions'

export default () => {

    BotProwider.bot.onText(/\/start/, (message) => {
        startAction(message)
    })

    BotProwider.bot.onText(/\/help/, (message) => {
        helpAction(message)
    })

    BotProwider.bot.onText(/Назад/, (message) => {
        backAction(message)
    })
}