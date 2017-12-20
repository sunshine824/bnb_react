import 'whatwg-fetch'
import 'es6-promise'


/**
 * 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
 * @param obj   post请求参数
 * @returns {string}
 */
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
        console.log(encodeURIComponent(obj[item]))
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}


/**
 * post 请求封装
 * @param url   请求api
 * @param param  请求参数
 * @returns {*}
 */
export function post(url,param) {
    var result = fetch(url, {
        method: 'POST',
        mode: "cors",
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: obj2params(param)
    });

    return result;
}