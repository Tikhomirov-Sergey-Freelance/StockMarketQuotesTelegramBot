import Schema, { iNotification } from '.'
import { mongooseRequest } from '../../code/mongoose-request'
import { findInsertIndexInSortedTimes } from '../../code/notifications'
import UserHelper from '../user/helper'

export default class NotificationHelper {

    static toggleNotificationTime(telegramId: number, chatId: number, times: string[]) {

        return mongooseRequest(async () => {

            const { error: findUserError, result: user } = await UserHelper.findOrCreateUser(telegramId)

            if (findUserError) {
                throw new Error(findUserError)
            }

            const userId = user.id
            const { error: findNotificationError, result: notification } = await this.findOrCreateNotification(userId, chatId)

            if (findNotificationError) {
                throw new Error(findNotificationError)
            }

            const result = { notification, added: [], deleted: [] }

            times.forEach((time) => {

                const foundIndex = notification.notificationTime.findIndex(notificationTime => notificationTime === time)
                const add = foundIndex === -1

                if (add) {

                    const insertIndex = findInsertIndexInSortedTimes(notification.notificationTime, time)

                    notification.notificationTime.splice(insertIndex, 0, time)
                    result.added.push(time)

                } else {
                    notification.notificationTime.splice(foundIndex, 1)
                    result.deleted.push(time)
                }
            })

            await notification.save()
            return result
        })
    }

    static getSelectedTimes(telegramId: number, chatId: number) {
        return mongooseRequest(async () => {

            const { error: findUserError, result: user } = await UserHelper.findOrCreateUser(telegramId)

            if (findUserError) {
                return []
            }

            const userId = user.id
            const { error: notificationError, result: notification } = await this.findNotificationById(userId, chatId)

            if (notificationError || !notification) {
                return []
            }

            return notification.notificationTime
        })
    }

    static findOrCreateNotification(userId: string, chatId: number) {

        return mongooseRequest(async () => {

            let { result: notification, error: findNotificationError } = await this.findNotificationById(userId, chatId)

            if (findNotificationError) {
                throw new Error(findNotificationError)
            }

            if (notification) return notification

            const { error, result: newNotification } = await this.createNotification({ userId, chatId })

            if (error) {
                throw new Error(error)
            }

            return newNotification
        })
    }

    static findNotificationById(userId: string, chatId: number) {
        return mongooseRequest(async () => {
            return Schema.findOne({ userId, chatId })
        })
    }

    static createNotification(notification: iNotification) {
        return mongooseRequest(async () => {
            return await new Schema(notification).save()
        })
    }
}

