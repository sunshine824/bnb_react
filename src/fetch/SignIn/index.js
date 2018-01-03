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


/**
 * 退出
 * @returns {*}
 * @constructor
 */
export function Layout() {
    const result=post('/api/out',{})

    return result
}