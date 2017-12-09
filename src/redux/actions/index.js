import * as actionTypes from '../../config/actionType'

/**
 * 触发日期更新action
 * @param date
 * @returns {{type, date: *}}
 */
export function update_date(date) {
    return {
        type:actionTypes.UPDATE_DATE,
        date
    }
}