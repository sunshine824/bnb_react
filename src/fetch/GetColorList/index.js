import {post} from '../post'

export function getColorList() {
    const result = post('/api/colorlists', {

    })

    return result
}