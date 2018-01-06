import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function show_popup(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Show_Popup:
            return {
                popup: action[0],
                id: action[1],
                date: action[2],
                editInfo: action[3],
                order_id:action[4],
                arrDate:action[5] ? action[5] : []
            }
        default:
            return state
    }
}