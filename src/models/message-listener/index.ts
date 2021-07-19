import { Schema, model } from 'mongoose'
import Helper from './helper'

export interface iMessageListener {
    userId: string
    chatId: number
    messages: number[]
    callbackData: string
}

const MessageListenerSchema = new Schema<iMessageListener>({

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chatId: {
        type: Number,
        required: true
    },
    messages: {
        type: [Number],
        required: true
    },
    callbackData: {
        type: String,
        required: true
    }
})

export const helper = Helper
export default model<iMessageListener>('messageListener', MessageListenerSchema)