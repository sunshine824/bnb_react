import {post} from '../post'

/**
 * 日历列表数据
 * @param key
 * @returns {*}
 */
export function getCalendarData
(sta_time = Date.parse(new Date()) * 0.001 - 3 * 24 * 60 * 60, type_id = '', key = '123456') {
    const result = post('/api/calendar', {
        sta_time: sta_time,
        type_id: type_id,
        key: key
    })

    return result
}