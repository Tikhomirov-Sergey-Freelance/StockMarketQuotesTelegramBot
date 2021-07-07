export const prepareTickers = (tickersString: string) => {
    return tickersString.trim().toUpperCase().split(',').map(ticker => ticker.trim())
}