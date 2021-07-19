import Schema, { iMessageListener } from '.'
import { mongooseRequest } from '../../code/mongoose-request'
import { findInsertIndexInSortedTimes } from '../../code/notifications'
import UserHelper from '../user/helper'

export default class MessageListenerHelper {

    static findMessageListenerById(userId: string, chatId: number) {
        return mongooseRequest(async () => {
            return Schema.findOne({ userId, chatId })
        })
    }

    static createMessageListener(listener: iMessageListener) {
        return mongooseRequest(async () => {

            let { error: findListenerError, result } = await this.findMessageListenerById(listener.userId, listener.chatId)

            if(findListenerError) {
                throw new Error(findListenerError)
            }
 
            if(!result) {
                result = new Schema(listener)
            }

            result.messages = listener.messages
            result.callbackData = listener.callbackData

            return await result.save()
        })
    }

    static popMessageListener(userId: string, chatId: number) {

        return mongooseRequest(async () => {

            let { error: findListenerError, result } = await this.findMessageListenerById(userId, chatId)

            if(findListenerError || !result) {
                return null
            }

            await result.delete()

            return result
        })
    }
}

