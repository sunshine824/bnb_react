import {post} from '../post'

/**
 * 房型筛选列表
 * @param key
 * @returns {*}
 */
export function getHouseListData() {
    const result = post('/api/types',{})

    return result
}

/**
 * 删除房型
 * @param id  房型id
 * @param key
 * @returns {*}
 */
export function deleteHouse(id) {
    const result = post('/api/detype', {
        id: id
    })

    return result
}

/**
 * 添加房型
 * @param data  参数集合
 * @param key
 * @returns {*}
 */
export function addHouse(data) {
    const result = post('/api/adtype', {
        ...data
    })

    return result
}

/**
 * 编辑房型
 * @param data
 * @param key
 * @returns {*}
 */
export function editHouse(data) {
    const result = post('/api/edtype', {
        ...data
    })

    return result
}

/**
 * 编辑获取房型信息
 * @param id  房型id
 * @param key
 * @returns {*}
 */
export function editHouseInfo(id) {
    const result = post('/api/type', {
        id:id
    })

    return result
}

/**
 * 删除房间
 * @param id
 * @param key
 * @returns {*}
 */
export function deteleRoom(id) {
    const result = post('/api/dehouses', {
        id:id
    })

    return result
}