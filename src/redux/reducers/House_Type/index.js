import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_house_type(state = initialState, action) {
    switch (action.type){
        case actionTypes.Save_House_TYPE:
            return[
                {
                    type_id:action.type_id
                }
            ]
        default:
            return state
    }
}