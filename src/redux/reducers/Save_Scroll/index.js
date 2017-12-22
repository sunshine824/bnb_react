import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_scroll(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Scroll:
            return {
                scrollTop: action.scrollTop,
                scrollLeft:action.scrollLeft
            }
        default:
            return state
    }
}