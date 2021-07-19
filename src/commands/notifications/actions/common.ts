import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../../code/bot'
import { NOTIFICATIONS_SETTINGS } from '../../../constants/notifications'
import { keyboards } from '../../../keyboards'
import { helpSettingsMessage } from '../parcer'
import NotificationHelper from '../../../models/notifications/helper'

export const notificationSettingsAction = (message: TelegramBot.Message) => {

    const chatId = message.chat.id

    BotProwider.bot.sendMessage(chatId, helpSettingsMessage, {
        reply_markup: {
            keyboard: keyboards.settingsNotification
        }
    })
}