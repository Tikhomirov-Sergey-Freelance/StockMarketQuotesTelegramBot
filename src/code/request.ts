import * as request from 'request-promise'
import { iPromiseResult } from '../interfaces/common'

const req = async <T>(uri: string, options?: request.RequestPromiseOptions): iPromiseResult<T> => {

    try {
        const result = await request(uri, options)
        return { result: JSON.parse(result) }
    }
    catch(error) {
        return { error }
    }
}

export default req