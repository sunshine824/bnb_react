import {post} from '../post'

/**
 * 获取订单数据
 * @param key  登录密钥
 * @param status 查询类型（1今日入住，2明日入住，3今日退房，4明日退房，5全部订单，6回收站）
 * @param start_time 开始时间
 * @param end_time  结束时间
 * @param content  搜索内容
 * @param page  页码
 * @returns {*}
 */
export function getOrderList(status = '5',
                             start_time='',
                             end_time='',
                             content = '',
                             page = 1,
                             key = '123456') {
    const result = post('/api/ordsta', {
        key: key,
        status: status,
        start_time: start_time,
        end_time: end_time,
        content: content,
        page: page
    })

    return result
}