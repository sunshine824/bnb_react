import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_form(state = initialState, action) {
    switch (action.type) {
        case actionTypes.Save_Form:
            return {
                form: action.form
            }
        default:
            return state
    }
}