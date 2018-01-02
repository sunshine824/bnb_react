import {combineReducers} from 'redux'
import save_Rooms from './Save_Rooms'
import update_date from './Update_Date'
import calendar_data from './Calendar_Data'
import save_path from './Save_Path'
import save_status from './Save_Status'
import save_scroll from './Save_Scroll'
import show_popup from './Show_Popup'
import save_remain_house from './Save_Remain_House'
import save_type_id from './Save_Type_id'
import save_user_name from './Save_User_Name'
import save_user_info from './Save_User_Info'


export default combineReducers({
    save_Rooms,
    update_date,
    calendar_data,
    save_path,
    save_status,
    save_scroll,
    show_popup,
    save_remain_house,
    save_type_id,
    save_user_name,
    save_user_info
})



