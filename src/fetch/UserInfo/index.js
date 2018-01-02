import {post} from '../post'

/**
 * 获取用户信息
 * @returns {*}
 */
export function getUserInfo() {
    const result = post('/api/user', {})

    return result
}

/**
 * 编辑用户信息
 * @returns {*}
 */
export function editUserInfo(data) {
    const result = post('/api/eduser', {
        ...data
    })

    return result
}