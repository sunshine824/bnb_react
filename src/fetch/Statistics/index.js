import {post} from '../post'

/**
 * 获取统计数据
 * @param key  登录获取密钥
 * @returns {*}
 */
export function getStatistics(key='123456') {
    const result=post('/api/statistics',{
        key:key,
    })

    return result
}