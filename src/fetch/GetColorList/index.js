import {post} from '../post'

/**
 * 获取颜色列表
 * @returns {*}
 */
export function getColorList() {
    const result = post('/api/colorlists', {})

    return result
}


/**
 * 编辑颜色
 * @param data
 * @returns {*}
 */
export function editColor(data) {
    const result=post('/api/coloredit',{
        ...data
    })

    return result
}