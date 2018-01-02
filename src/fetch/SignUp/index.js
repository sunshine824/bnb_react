import {post} from '../post'
import {serveUrl} from '../config'


/**
 * 用户注册提交
 * @param data
 * @returns {*}
 */
export function signUp(data) {
    const result = post('/api/registr', {
        ...data
    })

    return result
}

/**
 * 获取图片验证码
 * @param phone  用户手机号
 * @param random  唯一标示
 * @returns {*}
 */
export function getCode(phone, random) {
    const result = serveUrl + '/api/captcha/' + phone + '/' + random

    return result
}


/**
 * 验证图片验证码
 * @param code
 * @param phone
 * @returns {*}
 */
export function verifyCode(code, phone) {
    const result = post('/api/wer_add', {
        code,
        phone
    })

    return result
}
