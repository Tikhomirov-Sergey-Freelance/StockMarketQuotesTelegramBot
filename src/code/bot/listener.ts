import BotProwider from '.'
import UserHelper from '../../models/user/helper'
import MessageListenerHelper from '../../models/message-listener/helper'
import { iListener } from './interfaces'

class MessageListener {

    listeners: iListener[] = []

    listenMessages = () => {

        BotProwider.bot.on('message', async (message) => {
    
            const telegramId = message.from.id
            const chatId = message.chat.id
    
            if(!this.listeners.length) return
    
            const user = (await UserHelper.findOrCreateUser(telegramId)).result
            if(!user) return

            const listener = (await MessageListenerHelper.popMessageListener(user.id, chatId)).result
            if(!listener) return

            this.listeners.forEach(action => action(message, listener.callbackData, listener, user))
        })
    }

    addListener(listener: iListener) {
        this.listeners.push(listener)
    }
}

export default MessageListener