import * as TelegramBot from 'node-telegram-bot-api'

export const alias = {
    favourite: 'Избранные тикеры',
    notificationsSettings: 'Настроить оповещения'
}

const keyboard: TelegramBot.KeyboardButton[][] = [
    [{ text: alias.favourite }],
    [{ text: alias.notificationsSettings }]
]

export default keyboard