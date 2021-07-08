import * as TelegramBot from 'node-telegram-bot-api'
import BotProwider from '../../code/bot'
import UserHelper from '../../models/user/helper'

export const favoriteCallbackQuery = async (query: TelegramBot.CallbackQuery, data) => {

    const addFavorite: boolean = data.addFavorite
    const ticker = data.ticker
    const telegramId = query.from.id
    
    const { error } = await UserHelper.toggleFavorite(telegramId, [ticker], addFavorite)

    if(error) {
        return BotProwider.bot.answerCallbackQuery(query.id, { text: 'Произошла ошибка' })
    }

    return BotProwider.bot.answerCallbackQuery(query.id, { text: addFavorite ? 'Тикер добавлен в избранное' : 'Тикер удалён из избранного' })
}