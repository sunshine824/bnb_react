import * as actionTypes from '../../../config/actionType'
//import moment from 'moment'

const initialState = []
let remain_house = ''

export default function save_remain_house(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Remain_House:
            remain_house = action.remain_houses
            return Object.assign({},
                action.remain_houses
            )
        case actionTypes.Add_Remain_House:
            remain_house[action.date] = remain_house[action.date] + 1
            return Object.assign({},
                remain_house
            )
        case actionTypes.Red_Remain_House:
            remain_house[action.date] = remain_house[action.date] - 1
            return Object.assign({},
                remain_house
            )
        default:
            return state
    }
}