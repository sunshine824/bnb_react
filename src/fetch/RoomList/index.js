import {post} from '../post'

/**
 * 获取房间列表
 * @param key  登录获取密钥
 * @param id   房型筛选id
 * @returns {*}
 */
export function getRoomListData(id='',key='123456') {
    const result=post('/api/housess',{
        key:key,
        id:id
    })

    return result
}

/**
 * 编辑房间获取信息
 * @param id
 * @param key
 * @returns {*}
 */
export function editRoomInfo(id='',key='123456') {
    const result=post('/api/houses',{
        key:key,
        id:id
    })

    return result
}

/**
 * 编辑房间
 * @param data
 * @param key
 * @returns {*}
 */
export function editRoom(data,key='123456') {
    const result=post('/api/edhouses',{
        key:key,
        ...data
    })

    return result
}
