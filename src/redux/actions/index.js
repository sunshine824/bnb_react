import * as actionTypes from '../../config/actionType'

/**
 * 触发日期更新action
 * @param date
 * @returns {{type, date: *}}
 */
export function update_date(dateLists) {
    return {
        type: actionTypes.UPDATE_DATE,
        dateLists
    }
}

/**
 * 获取日历数据
 * @param calendar
 * @returns {{type, calendar: *}}
 */
export function calendar_data(calendar) {
    return {
        type: actionTypes.Calendar_DATA,
        calendar
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

/**
 * 是否显示左侧侧边栏
 * @param popup
 * @returns {{type, popup: *}}
 * @constructor
 */
export function show_popup(popup) {
    return {
        type: actionTypes.Show_Popup,
        popup
    }
}