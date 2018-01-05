import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {DatePicker, Select, message} from 'antd';
import moment from 'moment';
import {update_date, save_rooms, calendar_data, save_remain_house, save_type_id, show_popup} from '@/redux/actions'
import {getHouseListData} from '@/fetch/HouseList'
import {getRoomListData} from '@/fetch/RoomList'
import {getCalendarData} from '@/fetch/CalendarList'
import 'moment/locale/zh-cn';

import './style.less'

moment.locale('zh-cn');

const Option = Select.Option;
//const calendar = {}

class ScreenBox extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            house_list: [],
            house_id: '',
            sta_time: '',
            calendar: {},
            dateLists: [],
        }
    }

    componentDidMount() {
        //this.HandleDate(1)
        //获取日历数据
        this.getCalendarData()
        //获取房型数据
        this.getHouseList()
        //获取房间数据
        this.getRoomListData()

    }

    onChange(date, dateString) {
        this.setState({
            sta_time: moment(dateString).format("X")
        }, () => {
            this.getCalendarData()
        })
        //this.HandleDate(0, dateString)
    }

    /**
     * 获取日历数据
     * @param date 开始时间
     * @param id  房型id
     */
    getCalendarData(id, date) {
        const {actions} = this.props
        const result = getCalendarData(this.state.house_id, this.state.sta_time)
        //const calendarTime = []
        //const remain_house = {}
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 2) message.warn('暂无入住数据')

            /*for (let key in json.data) {
                json.data[key].map((item, index) => {
                    for (let i = 0; i < item.dates; i++) {
                        const date = moment.unix(item.sta_time).add(i, 'days').format('YYYY-MM-DD')
                        calendarTime.push(date)
                    }
                })
            }

            //获取重复个数
            const res = calendarTime.reduce((o, k) => {
                k in o ? o[k]++ : (o[k] = 1);
                return o;
            }, {});

            this.state.dateLists.map((item, index) => {
                if (res[item.slice(0, -2)]) {
                    remain_house[item.slice(0, -2)] = json.interpret - res[item.slice(0, -2)]
                } else {
                    remain_house[item.slice(0, -2)] = json.interpret
                }
            })*/

            //actions.save_remain_house(remain_house)
            const firstDate = Object.keys(json.data.house_calendar)[0]
            const endDate = Object.keys(json.data.house_calendar)[49]

            actions.calendar_data(json)
            actions.update_date([firstDate, endDate])

        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 筛选类型
     * @param value
     */
    handleChange(value) {
        const {actions} = this.props
        this.setState({
            house_id: value
        }, () => {
            this.getCalendarData()
        })

        actions.show_popup([false])
        this.getRoomListData(value)
    }

    /**
     * 获取房型列表
     */
    getHouseList() {
        const result = getHouseListData()
        result.then((res) => {
            return res.json()
        }).then(json => {
            this.setState({
                house_list: json.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 处理日期
     * @param isDefault
     * @param date
     * @constructor
     */
    HandleDate(isDefault, date) {
        /*const dateLists = []
        const {actions} = this.props

        if (isDefault) {
            //前三天日期
            for (let i = 3; i >= 1; i--) {
                dateLists.push(moment().subtract(i, 'days').format('YYYY-MM-DD dd'))
            }
            //今日日期
            dateLists.push(moment().format('YYYY-MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 46; i++) {
                dateLists.push(moment().add(i, 'days').format('YYYY-MM-DD dd'))
            }
        } else {
            if (!date) return
            //今日日期
            dateLists.push(moment(date).format('YYYY-MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 49; i++) {
                dateLists.push(moment(date).add(i, 'days').format('YYYY-MM-DD dd'))
            }
        }

        this.setState({
            dateLists: dateLists
        })*/

        //actions.update_date(dateLists)
    }

    /**
     * 获取房间列表
     * @param value
     */
    getRoomListData(value) {
        const {actions} = this.props
        const result = getRoomListData(value)
        result.then((res) => {
            return res.json()
        }).then(json => {
            actions.save_rooms(json)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const dateFormat = 'YYYY-MM-DD'
        const allowClear = false
        const {house_list} = this.state
        return (
            <div className="screen-box">
                <div className="box-date">
                    <DatePicker defaultValue={moment(moment(), dateFormat)}
                                onChange={this.onChange.bind(this)}
                                allowClear={allowClear}
                                format={dateFormat}/>
                </div>
                <div className="choose-type">
                    <Select
                        placeholder="筛选"
                        mode="multiple"
                        onChange={this.handleChange.bind(this)}
                    >
                        {
                            house_list ?
                                house_list.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>
                                            {item.abbre}
                                        </Option>
                                    )
                                })
                                : ''
                        }
                    </Select>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        states: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            update_date,
            save_rooms,
            calendar_data,
            save_remain_house,
            save_type_id,
            show_popup
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps, null, {withRef: true})(ScreenBox)