import * as actionTypes from '../../config/actionType'

/**
 * 触发日期更新action
 * @param date
 * @returns {{type, date: *}}
 */
export function update_date(data) {
    return {
        type: actionTypes.UPDATE_DATE,
        data
    }
}

/**
 * 保存房型id
 * @param type_id
 * @returns {{type, type_id: *}}
 */
export function save_house_type(roomList) {
    return {
        type: actionTypes.Save_House_TYPE,
        roomList
    }
}

/**
 * 保存当前路由
 * @param path
 * @returns {{type, path: *}}
 */
export function save_path(path) {
    return {
        type: actionTypes.Save_Path,
        path
    }
}

/**
 * 保存订单管理状态
 * @param status
 * @returns {{type, status: *}}
 */
export function save_status(status) {
    return {
        type: actionTypes.Save_Status,
        status
    }
}

/**
 * 保存日历管理滚动数据
 * @param scroll
 * @returns {{type, scrollHeight: *}}
 */
export function save_scroll(scroll) {
    return {
        type: actionTypes.Save_Scroll,
        ...scroll
    }
}