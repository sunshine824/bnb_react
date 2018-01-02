import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_user_name(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_User_Name:
            return {
                username: action.data
            }
        default:
            return state
    }
}