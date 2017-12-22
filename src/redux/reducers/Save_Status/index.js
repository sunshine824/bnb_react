import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_status(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Status:
            return [
                {
                    status: action.status
                }
            ]
        default:
            return state
    }
}