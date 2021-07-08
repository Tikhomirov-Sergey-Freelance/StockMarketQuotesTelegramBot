export const prepareTickers = (tickersString: string) => {
    return tickersString
        .trim()
        .toUpperCase()
        .split(',')
        .filter(ticker => ticker)
        .map(ticker => ticker.trim())
}