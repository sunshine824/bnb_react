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

/**
 * 获取省信息
 * @returns {*}
 */
export function getProvinceList() {
    const result = post('/api/province', {})

    return result
}

/**
 * 获取市信息
 * @param id
 * @returns {*}
 */
export function getCityList(id) {
    const result = post('/api/city', {
        id: id
    })

    return result
}

/**
 * 获取县区信息
 * @param id
 * @returns {*}
 */
export function getCountyList(id) {
    const result = post('/api/county', {
        id: id
    })

    return result
}