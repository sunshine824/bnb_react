import {post} from '../post'

/**
 * 登录
 * @param data
 * @returns {*}
 * @constructor
 */
export function SignIn(data) {
    const result=post('/api/logo',{
        ...data
    })

    return result
}