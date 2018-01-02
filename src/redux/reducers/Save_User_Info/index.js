import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_user_info(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_User_Info:
            return {
                userinfo: action.data
            }
        default:
            return state
    }
}