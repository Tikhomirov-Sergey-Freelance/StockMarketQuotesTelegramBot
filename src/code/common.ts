export const round = (value: number, digits: number) => {
    const ratio = 10 ** digits
    return Math.round(value * ratio) / ratio
}