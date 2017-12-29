import {post} from '../post'

export function getColorList(key = '123456') {
    const result = post('/api/colorlists', {
        key: key
    })

    return result
}