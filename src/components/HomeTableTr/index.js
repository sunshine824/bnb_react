import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {show_popup} from '@/redux/actions'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment';

import './style.less'

class HomeTableTr extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            calendars: [],
            arrIndex: ''
        }
    }

    componentDidMount() {
    }

    handleMouseOver(e) {
        this.props.handleOffset(e.pageX, e.pageY, true)
    }

    handleMouseOut() {
        this.props.handleOffset(0, -900, false)
    }

    handlePopup() {
        const {actions} = this.props
        actions.show_popup(!this.props.show_popup)
    }

    /*    renderTds() {
            const {start_date, calendars, roomList} = this.props

            let calendarId = []
            for (let k in calendars) {
                calendarId.push(parseInt(k))
            }

            for (let i in roomList.data) {
                if (calendarId.includes(roomList.data[i].id)) {
                    const arrIndex = []
                    const calendarsOne = calendars[roomList.data[i].id]
                    for (let key in calendarsOne) {
                        const index = moment(moment.unix(calendarsOne[key].sta_time)
                            .format('YYYY-MM-DD'))
                            .diff(moment(start_date), 'days')
                        arrIndex.push(index)
                    }

                    this.setState({
                        arrIndex: arrIndex
                    })
                } else {
                    /!*this.setState({
                        arrIndex: []
                    })*!/
                }
            }
        }*/

    render() {
        const {start_date, calendars, roomList} = this.props

        let arrIndex = []

        const renderTds = () => {
            let calendarId = []
            for (let k in calendars) {
                calendarId.push(parseInt(k))
            }

            for (let i in roomList.data) {
                if (calendarId.includes(roomList.data[i].id)) {
                    arrIndex = []
                    const calendarsOne = calendars[roomList.data[i].id]
                    for (let key in calendarsOne) {
                        const index = moment(moment.unix(calendarsOne[key].sta_time)
                            .format('YYYY-MM-DD'))
                            .diff(moment(start_date), 'days')
                        arrIndex.push(index)
                    }
                } else {
                    arrIndex = []
                }
            }
        }

        renderTds()


        const tds = (length, arrIndex) => {
            let res = []

            for (let i = 0; i < length; i++) {
                res.push(
                    <td className={arrIndex.includes(i) ? 'active' : ''} onClick={this.handlePopup.bind(this)}
                        key={i}
                        onMouseOver={this.handleMouseOver.bind(this)}
                        onMouseOut={this.handleMouseOut.bind(this)}>
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
            {
                roomList ?
                    (
                        !roomList.status ?
                            roomList.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {tds(50,arrIndex)}
                                    </tr>
                                )
                            })
                            : ''
                    )
                    : '加载中...'
            }
            </tbody>
        )
    }
}

function mapStateToProps(state) {
    return {
        start_date: state.update_date.dateLists ? state.update_date.dateLists[0].slice(0, -2) : '',
        calendars: state.calendar_data.calendar ? state.calendar_data.calendar.data : '',
        show_popup: state.show_popup.popup,
        roomList: state.save_Rooms.roomList ? state.save_Rooms.roomList : '',
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