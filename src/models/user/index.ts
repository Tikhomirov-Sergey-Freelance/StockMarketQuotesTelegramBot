import { Schema, model } from 'mongoose'

export interface iUser {
    telegramId: number,
    favoriteTickers: string[]
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

export default model<iUser>('users', UserSchema)