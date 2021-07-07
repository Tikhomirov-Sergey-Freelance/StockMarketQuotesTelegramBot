export type iPromiseResult<T> = Promise<iResult<T>>

export interface iResult<T> {
    result?: T
    error?: any
}