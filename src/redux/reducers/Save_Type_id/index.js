import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_type_id(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Type_id:
            return {
                type_id: action.id ? action.id : ''
            }
        default:
            return state
    }
}