import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function show_popup(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Show_Popup:
            return {
                popup: action[0],
                id: action[1],
                date: action[2]
            }
        default:
            return state
    }
}