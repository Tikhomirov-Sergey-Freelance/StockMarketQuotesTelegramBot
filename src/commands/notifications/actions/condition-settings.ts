import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../../code/bot'
import { NOTIFICATIONS_SETTINGS } from '../../../constants/notifications'
import { keyboards } from '../../../keyboards'
import { helpSettingsMessage } from '../parcer'
import { iUser } from '../../../models/user'
import UserHelper from '../../../models/user/helper'
import NotificationHelper from '../../../models/notifications/helper'
import { helper as MessageListenerHelper, iMessageListener } from '../../../models/message-listener'
import { isTimeRegExp } from '../../../code/notifications'
import { mapTimeKeys } from './time-keys'

export const notificationWaitConditionSettingsAction = async (message: TelegramBot.Message) => {

    const telegramId = message.from.id
    const chatId = message.chat.id

    const waitMessage = await BotProwider.bot.sendMessage(chatId, 'Введите нужное вам условие в формате:\nticker > 1200$\nПоддерживаемые условия: <, >, =.', {
        reply_markup: {
            keyboard: keyboards.settingsNotification
        }
    })

    const user = (await UserHelper.findOrCreateUser(telegramId)).result
    await MessageListenerHelper.createMessageListener({ userId: user.id, chatId, messages: [waitMessage.message_id], callbackData: JSON.stringify({ type: NOTIFICATIONS_SETTINGS.WAIT_CONDITION_SETTINGS }) })
}

export const notificationConditionSettingsAction = async (message: TelegramBot.Message, callbackData: any, listener: iMessageListener, user: iUser) => { 

    const chatId = message.chat.id
    BotProwider.bot.sendMessage(chatId, JSON.stringify(callbackData))
    console.log(listener)
}