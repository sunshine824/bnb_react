import {combineReducers} from 'redux'
import house_type from './House_Type'
import update_date from './Update_Date'
import calendar_data from './Calendar_Data'
import save_path from './Save_Path'
import save_status from './Save_Status'
import save_scroll from './Save_Scroll'
import show_popup from './Show_Popup'

export default combineReducers({
    house_type,
    update_date,
    calendar_data,
    save_path,
    save_status,
    save_scroll,
    show_popup
})



