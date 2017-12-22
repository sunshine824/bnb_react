import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function calendar_data(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Calendar_DATA:
            return {
                calendar: action.calendar
            }
        default:
            return state
    }
}