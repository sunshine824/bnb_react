import {post} from '../post'

/**
 * 获取房间列表
 * @param key  登录获取密钥
 * @param id   房型筛选id
 * @returns {*}
 */
export function getRoomListData(key='123456',id='') {
    const result=post('/api/housess',{
        key:key,
        id:id
    })

    return result
}