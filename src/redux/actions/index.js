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

/**
 * 保存房型id
 * @param type_id
 * @returns {{type, type_id: *}}
 */
export function save_house_type(type_id) {
    return{
        type:actionTypes.Save_House_TYPE,
        type_id
    }
}