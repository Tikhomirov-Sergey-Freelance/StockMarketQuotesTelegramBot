export const isTimeRegExp = /(\d{1,2}):(\d{2})/

export const findInsertIndexInSortedTimes = (times: string[], time: string, typeorder: string[] = ['time', 'everyHour', 'everyHalfHour'], startTime = 6) => {

    if(!times.length) return 0

    const timeTypeIndex = typeorder.findIndex(item => item === 'time')
    const parsedTime = parseTime(time, typeorder, timeTypeIndex)

    const hourTime = parsedTime.hour < startTime ? 24 + parsedTime.hour : parsedTime.hour

    for(let i = 0; i < times.length; i++) {

        const parsedItem = parseTime(times[i], typeorder, timeTypeIndex)

        if(parsedTime.typeIndex !== parsedItem.typeIndex) {
            
            if(parsedTime.typeIndex < parsedItem.typeIndex) {
                return i
            } else {
                continue
            }
        } 

        if(parsedTime.type !== 'time' || parsedItem.type !== 'time') continue

        if(parsedTime.hour === parsedItem.hour) {
            
            if(parsedTime.minutes < parsedItem.minutes) {
                return i
            } else {
                continue
            }
        }

        const hourItem = parsedItem.hour < startTime ? 24 + parsedItem.hour : parsedItem.hour
        
        if(hourTime < hourItem) {
            return i
        }
    }

    return times.length
}

export const sortByNotificationTime = (times: string[], typeorder: string[] = ['time', 'everyHour', 'everyHalfHour'], startTime = 6) => {

    
    const map: any = {}
    const timeTypeIndex = typeorder.findIndex(item => item === 'time')

    times.forEach(time => {
        map[time] = parseTime(time, typeorder, timeTypeIndex)
    })

    const sorted = times.sort((a, b) => {

        const mapA = map[a]
        const mapB = map[b]

        if(mapA.typeIndex !== mapB.typeIndex) {
            return mapA.typeIndex - mapB.typeIndex
        }

        if(mapA.typeIndex !== timeTypeIndex) {
            return 0
        }

        if(mapA.hour === mapB.hour) {
            return mapA.minutes - mapB.minutes
        }

        const hourA = mapA.hour < startTime ? 24 + mapA.hour : mapA.hour
        const hourB = mapB.hour < startTime ? 24 + mapB.hour : mapB.hour
        
        return hourA -  hourB
    }) 

    return sorted
}

export const parseTime = (time: string, typeorder: string[] = ['time', 'everyHour', 'everyHalfHour'], timeIndex = null) => {

    timeIndex = timeIndex || typeorder.findIndex(item => item === 'time')

    const match = time.match(isTimeRegExp)
    let typeIndex = timeIndex

    if(!match) {
        typeIndex = typeorder.findIndex(item => item === time)
        typeIndex = typeIndex === -1 ? typeorder.length : typeIndex
    }

    return {
        type: match ? 'time' : 'key',
        hour: match && +match[1],
        minutes: match && +match[2],
        typeIndex 
    }
}