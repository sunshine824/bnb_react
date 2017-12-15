import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function update_date(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_DATE:
            //console.log(action)
            return [
                {
                    calendars: action.data.calendars,
                    dateLists: action.data.dateLists
                }
            ]
        default:
            return state
    }
}