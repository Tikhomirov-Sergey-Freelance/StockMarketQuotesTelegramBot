import * as TelegramBot from 'node-telegram-bot-api'
import { iUser } from '../../models/user'
import { iMessageListener } from '../../models/message-listener'

export type iListener = (message: TelegramBot.Message, callbackData: any, listener: iMessageListener, user: iUser) => void