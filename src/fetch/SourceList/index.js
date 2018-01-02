import {post} from '../post'

/**
 * 渠道来源
 * @param key  登录获取密钥
 * @returns {*}
 */
export function getSourceList() {
    const result=post('/api/sourcess',{
    })

    return result
}
