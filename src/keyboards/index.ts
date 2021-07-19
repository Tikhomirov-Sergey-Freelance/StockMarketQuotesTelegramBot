import * as TelegramBot from 'node-telegram-bot-api'

import homeButtons, { alias as homeAlias } from './home'
import settingsNotificationButtons, { alias as settingsNotificationAlias } from './notifications'

interface iKeyboardsList {
    home: TelegramBot.KeyboardButton[][],
    settingsNotification: TelegramBot.KeyboardButton[][],
}

export const buttons = {
    home: homeAlias,
    settingsNotification: settingsNotificationAlias
}

export const keyboards: iKeyboardsList = {
    home: homeButtons,
    settingsNotification: settingsNotificationButtons
}

export type keyboadTypes = keyof iKeyboardsList