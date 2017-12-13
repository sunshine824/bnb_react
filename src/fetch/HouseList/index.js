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