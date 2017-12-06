import {post} from './post'

export function testData(encrypt_id) {
    const result = post('/guest/luck_info', {
        encrypt_id: encrypt_id
    })

    return result
}