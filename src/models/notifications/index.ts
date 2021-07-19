import { Schema, model } from 'mongoose'
import Helper from './helper'

export interface iNotification {
    userId: string
    chatId: number
    notificationTime?: string[]
}

const NotificationSchema = new Schema<iNotification>({

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chatId: {
        type: Number,
        required: true
    },
    notificationTime: {
        type: [String],
        default: []
    }
})

export const helper = Helper
export default model<iNotification>('notification', NotificationSchema)