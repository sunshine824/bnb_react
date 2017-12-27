import {combineReducers} from 'redux'
import save_Rooms from './Save_Rooms'
import update_date from './Update_Date'
import calendar_data from './Calendar_Data'
import save_path from './Save_Path'
import save_status from './Save_Status'
import save_scroll from './Save_Scroll'
import show_popup from './Show_Popup'
import save_remain_house from './Save_Remain_House'

export default combineReducers({
    save_Rooms,
    update_date,
    calendar_data,
    save_path,
    save_status,
    save_scroll,
    show_popup,
    save_remain_house
})



