import * as actionTypes from '../../../config/actionType'

const initialState = []

export default function save_path(state = initialState, action) {
    switch (action.type){
        case actionTypes.Save_Path:
            return[
                {
                    path:action.path
                }
            ]
        default:
            return state
    }
}