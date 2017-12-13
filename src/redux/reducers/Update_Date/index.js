import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function update_date(state = initialState, action) {
    console.log(action.date)
    switch (action.type) {
        case actionTypes.UPDATE_DATE:
            return [
                {
                    dateLists: action.date
                }
            ]
        default:
            return state
    }
}