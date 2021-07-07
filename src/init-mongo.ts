import * as Mongoose from 'mongoose'
import { mongoUrl } from './configs/common'

export default () => {

    Mongoose.connect(mongoUrl, {}, (error) => {

        if (error) {
            throw new Error(`Mongo connect error. ${error}`)
        }

        console.log('Mongo connected')
    })
}