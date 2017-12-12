import {post} from '../post'

export function getHouseListData(key) {
    const result=post('/api/types',{
        key:key
    })

    return result
}