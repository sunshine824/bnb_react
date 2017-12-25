import {post} from '../post'

/**
 * 渠道来源
 * @param key  登录获取密钥
 * @returns {*}
 */
export function getSourceList(key='123456') {
    const result=post('/api/sourcess',{
        key:key
    })

    return result
}
