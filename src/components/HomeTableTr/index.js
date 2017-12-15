import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import {getCalendarData} from '@/fetch/CalendarList'

import './style.less'

class HomeTableTr extends Component {
    constructor(props) {
        super(props)
        this.state = {
            calendars: []
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



    render() {
        const {roomList, start_date, calendars} = this.props

        const tds = (length) => {
            let res = []
            for (let i = 0; i < length; i++) {
                res.push(
                    <td key={i} onMouseOver={this.handleMouseOver.bind(this)}
                        onMouseOut={this.handleMouseOut.bind(this)}>
                        <div className="booked">
                            <p className="book-name"></p>
                        </div>
                    </td>
                )
            }
            return res
        }

        const renderRow = () => {

            for (let k in calendars) {
                const bookItem = calendars[k]
                for (let key in bookItem) {
                    const num = moment(moment.unix(bookItem[key].sta_time)
                        .format('YYYY-MM-DD'))
                        .diff(moment(start_date), 'days')

                    const rowID = '.row' + k
                    setTimeout(() => {
                        const tds = document.querySelector(rowID).getElementsByTagName('td')[num]
                        tds.className = 'active'
                        const booked = tds.getElementsByClassName('booked')[0]
                        bookItem[key].dates > 1 ?
                            booked.style.width = 94.5 * bookItem[key].dates + 'px'
                            :
                            booked.style.width = 93 + 'px'

                        booked.getElementsByClassName('book-name')[0].innerHTML = bookItem[key].name
                    }, 300)
                }
            }
        }

        renderRow()

        return (
            <tbody>
            {
                roomList ?
                    roomList.map((item, index) => {
                        return (
                            <tr key={index} pos-y={item.id} ref={"row" + item.id} className={"row" + item.id}>
                                {tds(50)}
                            </tr>
                        )
                    })
                    : ''
            }
            </tbody>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomList: state.house_type[0] ? state.house_type[0].roomList : '',
        start_date: state.update_date[0] ? state.update_date[0].dateLists[0].slice(0, -2) : '',
        calendars: state.update_date[0] ? state.update_date[0].calendars : ''
    }
}

export default connect(mapStateToProps)(HomeTableTr)