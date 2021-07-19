import { parseTime, sortByNotificationTime, findInsertIndexInSortedTimes } from '../../code/notifications'

test('ParseTime time string', () => {
    expect(parseTime('11:30')).toEqual({ type: 'time', hour: 11, minutes: 30, typeIndex: 0 })
})

test('ParseTime key string', () => {
    expect(parseTime('everyHour')).toEqual({ type: 'key', hour: null, minutes: null, typeIndex: 1 })
})

test('SortByNotificationTime sort empty times array', () => {
    expect(sortByNotificationTime([])).toEqual([])
})

test('SortByNotificationTime sort array with times', () => {
    const array = ['6:00', '5:41', '5:40', '17:50']
    expect(sortByNotificationTime(array)).toEqual(['6:00', '17:50', '5:40', '5:41'])
})

test('SortByNotificationTime sort array with keys', () => {
    const array = ['key', 'everyHour']
    expect(sortByNotificationTime(array)).toEqual(['everyHour', 'key'])
})

test('SortByNotificationTime sort array with times and keys', () => {
    const array = ['5:41', '5:40', 'key', 'everyHour', '17:50', '12:30']
    expect(sortByNotificationTime(array)).toEqual(['12:30', '17:50', '5:40', '5:41', 'everyHour', 'key'])
})

test('FindInsertIndex insert to empty array', () => {
    expect(findInsertIndexInSortedTimes([], '11:30')).toBe(0)
})

test('FindInsertIndex insert to time array', () => {
    expect(findInsertIndexInSortedTimes(['11:00', '14:00'], '11:30')).toBe(1)
})

test('FindInsertIndex insert key to time array ', () => {
    expect(findInsertIndexInSortedTimes(['11:00', '14:00'], 'everyHour')).toBe(2)
})

test('FindInsertIndex insert time to time and keys array ', () => {
    expect(findInsertIndexInSortedTimes(['11:00', '14:00', 'everyHalfHour', 'key'], '11:30')).toBe(1)
})

test('FindInsertIndex insert key to time and key array ', () => {
    expect(findInsertIndexInSortedTimes(['11:00', '14:00', 'everyHalfHour', 'key'], 'everyHour')).toBe(2)
})