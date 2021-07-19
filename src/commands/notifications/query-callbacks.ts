import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../code/bot'
import UserHelper from '../../models/user/helper'
import NotificationHelper from '../../models/notifications/helper'

export const notificationsToggleTime = async (query: TelegramBot.CallbackQuery, data) => {

    const chatId = query.message.chat.id
    const telegramId = query.from.id

    const { time } = data

    const { result, error } = await NotificationHelper.toggleNotificationTime(telegramId, chatId, [time])
    
    if(error) {
        console.log(error)
        return await BotProwider.bot.answerCallbackQuery(query.id, { text: 'Произошла ошибка' })
    }

    const { notification, added, deleted } = result
    await BotProwider.bot.answerCallbackQuery(query.id, { text: added.length ? 'Время добавлено' : 'Время удалено' })
}

