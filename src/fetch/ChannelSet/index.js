import {post} from '../post'


/**
 * 获取渠道列表
 * @returns {*}
 */
export function getSourcesList() {
    const result = post('/api/sourcess', {})

    return result
}

/**
 * 删除渠道
 * @param id
 * @returns {*}
 */
export function deleteSource(id) {
    const result = post('/api/desources', {
        id
    })

    return result
}

/**
 * 编辑渠道
 * @param id
 * @returns {*}
 */
export function editSource(data) {
    const result = post('/api/edsources', {
        ...data
    })

    return result
}

/**
 * 渠道编辑信息
 * @param id
 * @returns {*}
 */
export function sourceInfo(id) {
    const result = post('/api/sources', {
        id
    })

    return result
}

/**
 * 添加渠道
 * @param source
 * @returns {*}
 */
export function addSource(data) {
    const result = post('/api/adsources', {
        ...data
    })

    return result
}