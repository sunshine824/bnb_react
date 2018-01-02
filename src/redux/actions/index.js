import * as actionTypes from '../../config/actionType'

/**
 * 保存用户信息
 * @param data
 * @returns {{type, data: *}}
 */
export function save_user_info(data) {
    return {
        type: actionTypes.Save_User_Info,
        data
    }
}

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
 * 保存房型id
 * @param id
 * @returns {{type, id: *}}
 */
export function save_type_id(id) {
    return {
        type: actionTypes.Save_Type_id,
        id
    }
}

/**
 * 剩余房间
 * @param remain_houses
 * @returns {{type, date: *}}
 */
export function save_remain_house(remain_houses) {
    return {
        type: actionTypes.Save_Remain_House,
        remain_houses
    }
}

/**
 * 递增剩余房间
 * @param date
 * @returns {{type, date: *}}
 */
export function add_remain_house(date) {
    return {
        type: actionTypes.Add_Remain_House,
        date
    }
}

/**
 * 递减剩余房间
 * @param date
 * @returns {{type, date: *}}
 */
export function red_remain_house(date) {
    return {
        type: actionTypes.Red_Remain_House,
        date
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
 * 获取房间列表
 * @returns {{type, type_id: *}}
 */
export function save_rooms(roomList) {
    return {
        type: actionTypes.Save_Rooms,
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
        ...popup
    }
}