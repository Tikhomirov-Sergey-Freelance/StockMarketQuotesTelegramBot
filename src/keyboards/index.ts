import * as TelegramBot from 'node-telegram-bot-api'

import homeButtons, { alias as homeAlias } from './home'

interface iKeyboardsList {
    home: TelegramBot.KeyboardButton[][]
}

export const buttons = {
    home: homeAlias
}

export const keyboards: iKeyboardsList = {
    home: homeButtons
}

export type keyboadTypes = keyof iKeyboardsList