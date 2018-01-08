import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {show_popup} from '@/redux/actions'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {editCheckInfo} from '@/fetch/EditCheckin'
import {hasClass, addClass, removeClass, checkClash} from '@/config/fnMixin'
import moment from 'moment';

import './style.less'

let tranId = 0
let arrDate = []
let now_id, prev_id

class HomeTableTr extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            calendars: [],
            arrIndex: '',
            editInfo: ''
        }
    }

    componentDidMount() {

    }

    handleMouseOver(hoverData, e) {
        this.props.handleOffset(e.pageX, e.pageY, true, hoverData)
    }

    handleMouseOut(e) {
        this.props.handleOffset(0, -900, false)
    }

    handlePopup(id, order_id, date, event) {
        const {calendars, actions, popup} = this.props
        now_id = id


        if (!popup) arrDate = []


        if (order_id) { //编辑订单
            this._editCheckInfo(id, order_id, date)
            return false
        } else {  //添加订单
            const dom = event.target.nodeName === 'DIV' ? event.target.parentNode : event.target
            dom.className = 'seleted'
            arrDate.push(date)
            if (arrDate.length > 1) { //当arrDate中有两个的时候
                if (now_id !== prev_id) {  //两次点击是否是同一个id
                    let index = arrDate.indexOf(date)
                    arrDate = arrDate.splice(index, 1)
                }
                //是否时间冲突
                if (checkClash(moment, calendars, arrDate, id)) {
                    let index = arrDate.indexOf(date)
                    arrDate = arrDate.splice(index, 1)
                }
            }

            //判断是否点了三次
            if (arrDate.length > 2) {
                arrDate = []
                arrDate.push(date)
            }

            actions.show_popup([
                true,
                id,
                date,
                '',
                order_id,
                arrDate
            ])


            //选中状态操作
            if (prev_id) {
                const dom = event.target.nodeName === 'DIV' ? event.target.parentNode : event.target
                const now_tds = document.querySelectorAll('#room_cell' + now_id + ' td')
                const prev_tds = document.querySelectorAll('#room_cell' + prev_id + ' td')
                if (now_id === prev_id) {
                    if (arrDate.length === 1) {
                        for (let i = 0; i < now_tds.length; i++) {
                            removeClass(now_tds[i], 'seleted')
                        }
                    }
                    dom.className = 'seleted'
                    arrDate.sort()

                    //连接操作
                    this.connectTd()

                } else {
                    for (let i = 0; i < prev_tds.length; i++) {
                        removeClass(prev_tds[i], 'seleted')
                    }
                }
            }

            prev_id = id
        }
    }

    /**
     * 连接显示
     * @param id 房间id
     */
    connectTd() {
        const {start_date} = this.props
        const el = document.querySelectorAll('#room_cell' + now_id + ' td')
        const num1 = moment(moment(arrDate[0])
            .format('YYYY-MM-DD'))
            .diff(moment.unix(start_date).format('YYYY-MM-DD'), 'days')
        const num2 = moment(moment(arrDate[1] ? arrDate[1] : arrDate[0])
            .format('YYYY-MM-DD'))
            .diff(moment.unix(start_date).format('YYYY-MM-DD'), 'days')
        for (let i = num1; i <= num2; i++) {
            addClass(el[i], 'seleted')
        }
    }

    /**
     * 获取编辑入住回显信息
     * @param id  房间id
     * @param order_id  订单id
     * @param date
     * @private
     */
    _editCheckInfo(id, order_id, date) {
        const {actions} = this.props
        const result = editCheckInfo(order_id)
        result.then((res) => {
            return res.json()
        }).then(json => {
            this.setState({
                editInfo: json
            }, () => {
                actions.show_popup([
                    true,
                    id,
                    date,
                    this.state.editInfo,
                    order_id,
                ])
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {start_date, calendars, roomList, id, dateLists, end_date} = this.props

        let arrIndex = []
        const calendarObj = {}

        if (calendars[id]) {
            for (let key in calendars[id]) {
                const sta_time = calendars[id][key].sta_time < start_date ? start_date : calendars[id][key].sta_time
                let index = moment(moment.unix(sta_time)
                    .format('YYYY-MM-DD'))
                    .diff(moment.unix(start_date).format('YYYY-MM-DD'), 'days')
                calendarObj[index] = calendars[id][key]
                arrIndex.push(index)
            }
        }

        const tds = (length, arrIndex) => {
            let res = []

            for (let i = 0; i < length; i++) {
                res.push(
                    arrIndex.includes(i) ?
                        <td className='active'
                            data-date={moment.unix(Object.keys(dateLists)[i]).format('YYYY-MM-DD')}
                            onClick={this.handlePopup.bind(this, id, calendarObj[i].id, '', calendarObj[i].house_id)}
                            key={i}
                            onMouseOver={this.handleMouseOver.bind(this, calendarObj[i])}
                            onMouseOut={this.handleMouseOut.bind(this)}>
                            <div className="booked"
                                 style={{
                                     width: calendarObj[i] ?
                                         calendarObj[i].dates > 1 ?
                                             calendarObj[i].sta_time < start_date ?
                                                 93 + 96 * (parseInt(calendarObj[i].dates - 1) + parseInt(moment(moment.unix(calendarObj[i].sta_time)
                                                     .format('YYYY-MM-DD'))
                                                     .diff(moment.unix(start_date).format('YYYY-MM-DD'), 'days'))) :
                                                 calendarObj[i].com_time > end_date ?
                                                     93 + 96 * (parseInt(calendarObj[i].dates - 1) - (parseInt(moment(moment.unix(calendarObj[i].com_time)
                                                         .format('YYYY-MM-DD'))
                                                         .diff(moment.unix(end_date).format('YYYY-MM-DD'), 'days')) - 1))
                                                     : 93 + 96 * (calendarObj[i].dates - 1) + 'px'
                                             : 93 * calendarObj[i].dates
                                         : '',
                                     backgroundColor: calendarObj[i] ?
                                         calendarObj[i].status === 2 ?
                                             '#a9a7a7'
                                             : calendarObj[i].color
                                         : '',
                                     cursor: calendarObj[i] ?
                                         calendarObj[i].status === 2 ?
                                             'not-allowed'
                                             : ''
                                         : ''
                                 }}>
                                <p className="book-name">{calendarObj[i].source_name} / {calendarObj[i].name}</p>
                            </div>
                        </td>
                        :
                        <td data-date={moment.unix(Object.keys(dateLists)[i]).format('YYYY-MM-DD')}
                            onClick={this.handlePopup.bind(this, id, '', moment.unix(Object.keys(dateLists)[i]).format('YYYY-MM-DD'))}
                            key={i}>
                            <div className="booked">
                                <p className="book-name"></p>
                            </div>
                        </td>
                )
            }
            return res
        }


        return (
            <tr id={'room_cell' + id}>
                {tds(50, arrIndex)}
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return {
        dateLists: state.calendar_data.calendar ? state.calendar_data.calendar.data ? state.calendar_data.calendar.data.house_calendar : '' : '',
        start_date: state.update_date.dateLists ? state.update_date.dateLists : '',
        end_date: state.update_date.endDate ? state.update_date.endDate : '',
        calendars: state.calendar_data.calendar ? state.calendar_data.calendar.data ? state.calendar_data.calendar.data.orders : '' : '',
        show_popup: state.show_popup.popup,
        roomList: state.save_Rooms.roomList ? state.save_Rooms.roomList : '',
        remain_house: state.save_remain_house,
        type_id: state.save_type_id.type_id,
        popup: state.show_popup.popup,
        arr_date: state.show_popup.arrDate
    }
}

function mapActionsProps(dispatch) {
    return {
        actions: bindActionCreators({
            show_popup
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsProps)(HomeTableTr)