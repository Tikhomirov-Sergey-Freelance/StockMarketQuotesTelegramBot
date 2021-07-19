import { Schema, model } from 'mongoose'
import Helper from './helper'

export interface iUser {
    telegramId: number
    favoriteTickers?: string[]
}

const UserSchema = new Schema<iUser>({

    telegramId: {
        type: Number,
        required: true
    },
    favoriteTickers: {
        type: [String],
        default: []
    }
})

export const helper = Helper
export default model<iUser>('users', UserSchema)