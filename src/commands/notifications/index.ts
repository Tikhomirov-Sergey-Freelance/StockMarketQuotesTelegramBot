
import BotProwider from '../../code/bot'
import { buttons } from '../../keyboards'
import { NOTIFICATIONS_SETTINGS } from '../../constants/notifications'
import { notificationSettingsAction } from './actions/common'
import { notificationTimeSettingsAction } from './actions/actions-time-settings'
import { notificationWaitConditionSettingsAction, notificationConditionSettingsAction } from './actions/condition-settings'
import { notificationsToggleTime } from './query-callbacks'

export default () => {

    BotProwider.bot.onText(/Настроить оповещения/, (message) => {
        notificationSettingsAction(message)
    })

    BotProwider.bot.onText(new RegExp(buttons.settingsNotification.timeSettings), (message) => {
        notificationTimeSettingsAction(message)
    })

    BotProwider.bot.onText(new RegExp(buttons.settingsNotification.conditionSettings), (message) => {
        notificationWaitConditionSettingsAction(message)
    })

    BotProwider.listenMessage((message, callbackData, listener, user) => {

        const data = JSON.parse(callbackData)

        switch(data.type) {

            case NOTIFICATIONS_SETTINGS.WAIT_CONDITION_SETTINGS: 
                notificationConditionSettingsAction(message, data, listener, user)

        }

    })

    BotProwider.bot.on('callback_query', query => {

        const data = JSON.parse(query.data)

        switch (data.type) {

            case NOTIFICATIONS_SETTINGS.TOGGLE_TIME:
                notificationsToggleTime(query, data) 
                break
        }
    })
}