import 'whatwg-fetch'
import 'es6-promise'


/**
 * get 请求封装
 * @param url  请求api
 * @returns {*}
 */
export function get(url) {
    var result = fetch(url)

    return result
}