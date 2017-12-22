import {combineReducers} from 'redux'
import house_type from './House_Type'
import update_date from './Update_Date'
import save_path from './Save_Path'
import save_status from './Save_Status'
import save_scroll from './Save_Scroll'

export default combineReducers({
    house_type,
    update_date,
    save_path,
    save_status,
    save_scroll
})



