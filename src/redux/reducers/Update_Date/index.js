import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function update_date(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_DATE:
            return {
                dateLists: action.dateLists[0],
                endDate:action.dateLists[1]
            }
        default:
            return state
    }
}