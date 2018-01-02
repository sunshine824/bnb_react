import {post} from '../post'

/**
 * 获取房间列表
 * @param key  登录获取密钥
 * @param id   房型筛选id
 * @returns {*}
 */
export function getRoomListData(id='') {
    const result=post('/api/housess',{
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
export function editRoomInfo(id='') {
    const result=post('/api/houses',{
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
export function editRoom(data) {
    const result=post('/api/edhouses',{
        ...data
    })

    return result
}
