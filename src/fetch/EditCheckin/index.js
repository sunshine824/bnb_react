import {post} from '../post'

/**
 * 添加入住
 * @param key
 * @returns {*}
 */
export function addCheckIn(data, key = '123456') {
    const result = post('/api/adorder', {
        ...data,
        key: key
    })

    return result
}

/**
 * 编辑入住
 * @param key
 * @returns {*}
 */
export function editCheckIn(data, key = '123456') {
    const result = post('/api/edorder', {
        ...data,
        key: key
    })

    return result
}

/**
 * 编辑入住返回信息
 * @param id
 * @param key
 * @returns {*}
 */
export function editCheckInfo(id, key = '123456') {
    const result = post('/api/order', {
        id: id,
        key: key
    })

    return result
}

/**
 * 删除订单
 * @param id
 * @param key
 * @returns {*}
 */
export function deleteCheckIn(id,key='123456') {
    const result=post('/api/deorder',{
        id:id,
        key:key
    })

    return result
}