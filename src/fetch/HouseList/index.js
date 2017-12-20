import {post} from '../post'

/**
 * 房型筛选列表
 * @param key
 * @returns {*}
 */
export function getHouseListData(key = '123456') {
    const result = post('/api/types', {
        key: key
    })

    return result
}

/**
 * 删除房型
 * @param id  房型id
 * @param key
 * @returns {*}
 */
export function deleteHouse(id, key = '123456') {
    const result = post('/api/detype', {
        id: id,
        key: key
    })

    return result
}

/**
 * 添加房型
 * @param data  参数集合
 * @param key
 * @returns {*}
 */
export function addHouse(data, key = '123456') {
    const result = post('/api/adtype', {
        ...data,
        key: key
    })

    return result
}

/**
 * 编辑房型
 * @param data
 * @param key
 * @returns {*}
 */
export function editHouse(data, key = '123456') {
    const result = post('/api/edtype', {
        ...data,
        key: key
    })

    return result
}

/**
 * 编辑获取房型信息
 * @param id  房型id
 * @param key
 * @returns {*}
 */
export function editHouseInfo(id,key='123456') {
    const result = post('/api/type', {
        id:id,
        key: key
    })

    return result
}