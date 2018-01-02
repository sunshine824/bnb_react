import {post} from '../post'


/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export function editpwd(data) {
    const result=post('/api/editpwd',{
        ...data
    })

    return result
}