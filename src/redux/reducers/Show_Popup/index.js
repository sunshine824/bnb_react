import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function show_popup(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Show_Popup:
            return {
                popup: action.popup
            }
        default:
            return state
    }
}