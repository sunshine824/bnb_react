import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_rooms(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Rooms:
            return {
                roomList: action.roomList
            }
        default:
            return state
    }
}