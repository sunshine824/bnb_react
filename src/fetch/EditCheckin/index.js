import {post} from '../post'

/**
 * 添加入住
 * @param key
 * @returns {*}
 */
export function addCheckIn(data) {
    const result = post('/api/adorder', {
        ...data
    })

    return result
}

/**
 * 编辑入住
 * @param key
 * @returns {*}
 */
export function editCheckIn(data) {
    const result = post('/api/edorder', {
        ...data
    })

    return result
}

/**
 * 编辑入住返回信息
 * @param id
 * @param key
 * @returns {*}
 */
export function editCheckInfo(id) {
    const result = post('/api/order', {
        id: id
    })

    return result
}

/**
 * 删除订单
 * @param id
 * @param key
 * @returns {*}
 */
export function deleteCheckIn(id) {
    const result=post('/api/deorder',{
        id:id
    })

    return result
}