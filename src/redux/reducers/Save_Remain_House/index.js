import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_remain_house(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Remain_House:
            return {
                remain_house: action.remain_houses
            }
        default:
            return state
    }
}