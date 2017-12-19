import {post} from '../post'

/**
 * 房型筛选列表
 * @param key
 * @returns {*}
 */
export function getHouseListData(key='123456') {
    const result=post('/api/types',{
        key:key
    })

    return result
}

/**
 * 删除房型
 * @param id  房型id
 * @param key
 * @returns {*}
 */
export function deleteHouse(id,key='123456') {
    const result=post('/api/detype',{
        id:id,
        key:key
    })

    return result
}