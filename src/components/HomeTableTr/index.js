import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {show_popup} from '@/redux/actions'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {editCheckInfo} from '@/fetch/EditCheckin'
import moment from 'moment';

import './style.less'

let tranId = 0

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
        this._editCheckInfo(id, order_id, date)
    }

    /**
     * 获取编辑入住回显信息
     * @param id
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
                    !this.props.show_popup,
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
        const {start_date, calendars, roomList, id, dateLists} = this.props


        let arrIndex = []
        const calendarObj = {}

        if (calendars[id]) {
            for (let key in calendars[id]) {
                const index = moment(moment.unix(calendars[id][key].sta_time)
                    .format('YYYY-MM-DD'))
                    .diff(moment(start_date), 'days')
                calendarObj[index] = calendars[id][key]
                arrIndex.push(index)
            }
        }

        const tds = (length, arrIndex) => {
            let res = []

            for (let i = 0; i < length; i++) {
                res.push(
                    arrIndex.includes(i) ?
                        <td className='active' data-date={dateLists[i]}
                            onClick={this.handlePopup.bind(this, id, calendarObj[i].id, '')}
                            key={i}
                            onMouseOver={this.handleMouseOver.bind(this, calendarObj[i])}
                            onMouseOut={this.handleMouseOut.bind(this)}>
                            <div className="booked"
                                 style={{
                                     width: calendarObj[i] ?
                                         calendarObj[i].dates > 1 ?
                                             95 * calendarObj[i].dates + 'px'
                                             : 93 * calendarObj[i].dates
                                         : ''
                                 }}>
                                <p className="book-name">{calendarObj[i].source_name} / {calendarObj[i].name}</p>
                            </div>
                        </td>
                        :
                        <td data-date={dateLists[i]}
                            onClick={this.handlePopup.bind(this, id, '', dateLists[i].slice(0, -2))}
                            key={i} className="seleted">
                            <div className="booked">
                                <p className="book-name"></p>
                            </div>
                        </td>
                )
            }
            return res
        }


        return (
            <tbody>
            <tr>
                {tds(50, arrIndex)}
            </tr>
            </tbody>
        )
    }
}

function mapStateToProps(state) {
    return {
        dateLists: state.update_date.dateLists ? state.update_date.dateLists : '',
        start_date: state.update_date.dateLists ? state.update_date.dateLists[0].slice(0, -2) : '',
        calendars: state.calendar_data.calendar ? state.calendar_data.calendar.data : '',
        show_popup: state.show_popup.popup,
        roomList: state.save_Rooms.roomList ? state.save_Rooms.roomList : '',
        remain_house: state.save_remain_house
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