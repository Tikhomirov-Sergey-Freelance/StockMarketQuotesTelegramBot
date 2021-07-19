import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../../code/bot'
import { NOTIFICATIONS_SETTINGS } from '../../../constants/notifications'
import { keyboards } from '../../../keyboards'
import { helpSettingsMessage } from '../parcer'
import NotificationHelper from '../../../models/notifications/helper'
import { isTimeRegExp } from '../../../code/notifications'
import { mapTimeKeys } from './time-keys'

export const notificationTimeSettingsAction = async (message: TelegramBot.Message) => {

    const telegramId = message.from.id
    const chatId = message.chat.id

    const selectedTimes = (await NotificationHelper.getSelectedTimes(telegramId, chatId)).result

    await showFullKeyboard(message, selectedTimes)
    return await showSelectedKeyboard(message, selectedTimes)
}

export const showSelectedKeyboard = (message: TelegramBot.Message, selectedTimes: string[]) => {

    if(!selectedTimes.length) return
    message.message_id
    const chatId = message.chat.id
    const inlineKeyboard = generateSelectedTimeNotificationKeyboard(selectedTimes)

    return BotProwider.bot.sendMessage(chatId, 'Выбранное время:', {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    })
}

export const showFullKeyboard = (message: TelegramBot.Message, selectedTimes: string[]) => {

    const chatId = message.chat.id
    const inlineKeyboard = generateNotificationTimeKeyboard(selectedTimes)

    return BotProwider.bot.sendMessage(chatId, 'Выберите время оповещения.\nВ выбранное время вам придет курс избранных тикеров.', {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    })
}

export const generateSelectedTimeNotificationKeyboard = (selectedTimes: string[]) => {

    const rowCount = 4
    let inlineKeyboard: TelegramBot.InlineKeyboardButton[][] = []

    let row: TelegramBot.InlineKeyboardButton[] = []

    const timeToKeyboard = (timeTitle: string, key?: string): TelegramBot.InlineKeyboardButton => {
        key = key || timeTitle
        return { text: `🕐 ${timeTitle}`, callback_data: JSON.stringify({ type: NOTIFICATIONS_SETTINGS.TOGGLE_TIME, time: key }) }
    }

    selectedTimes.forEach(time => {

        const isTime = isTimeRegExp.test(time)

        if(isTime) {
            row.push(timeToKeyboard(time))
        } else {

            if(row.length) {
                inlineKeyboard.push(row)
                row = []
            }

            inlineKeyboard.push([timeToKeyboard(mapTimeKeys[time].title, time)])
        }

        if(row.length === 4) {
            inlineKeyboard.push(row)
            row = []
        }
    })

    return inlineKeyboard
}

export const generateNotificationTimeKeyboard = (selectedTime: string[]) => {

    let inlineKeyboard: TelegramBot.InlineKeyboardButton[][] = []

    const endHour = 6
    let currentHour = 6

    const timeToKeyboard = (time: string, key?: string): TelegramBot.InlineKeyboardButton => {

        key = key || time
        const isSelected = selectedTime.some(selected => selected === key)

        return { text: `${isSelected ? '🕐 ' : ''}${time}`, callback_data: JSON.stringify({ type: NOTIFICATIONS_SETTINGS.TOGGLE_TIME, time: key }) }
    }
 
    do  {

        let row: TelegramBot.InlineKeyboardButton[] = []

        for(let i = 0; i <= 3; i++) {
            const time = `${currentHour}:${i * 15}${i === 0 ? '0' : ''}`
            row.push(timeToKeyboard(time))
        }

        inlineKeyboard.push(row)
        currentHour++
        
        if(currentHour === 24) {
            currentHour = 0
        }
    } 
    while (currentHour !== endHour)

    inlineKeyboard.push([timeToKeyboard(mapTimeKeys.everyHour.title, mapTimeKeys.everyHour.key)])
    inlineKeyboard.push([timeToKeyboard(mapTimeKeys.everyHalfHour.title, mapTimeKeys.everyHalfHour.key)])

    return inlineKeyboard
}

export const timeToKeyboard = (selectedTime: string[], time: string, key?: string): TelegramBot.InlineKeyboardButton => {

    key = key || time
    const isSelected = selectedTime.some(selected => selected === key)

    return { text: `${isSelected ? '🕐 ' : ''}${time}`, callback_data: JSON.stringify({ type: NOTIFICATIONS_SETTINGS.TOGGLE_TIME, time: key }) }
}

