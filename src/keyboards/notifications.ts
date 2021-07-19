import * as TelegramBot from 'node-telegram-bot-api'

import { backButton } from './common'

export const alias = {
    timeSettings: 'Оповещения по времени',
    conditionSettings: 'Оповещения по условию',
    back: backButton.text
}

const keyboard: TelegramBot.KeyboardButton[][] = [
    [{ text: alias.timeSettings }],
    [{ text: alias.conditionSettings }],
    [backButton]
]

export default keyboard