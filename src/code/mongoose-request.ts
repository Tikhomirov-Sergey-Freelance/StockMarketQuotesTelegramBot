type ActionMongoose<T> = () => Promise<T>
export const mongooseRequest = async <T>(action: ActionMongoose<T>) => {
    try {
        const result: T = await action()
        return { result }
    }
    catch(error) {
        return { error }
    }
}