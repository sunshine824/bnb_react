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
        this.getCalendarData()
    }

    getCalendarData() {
        const result = getCalendarData()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                calendars: json.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    renderRow() {
        const {calendars} = this.state
        const {start_date} = this.props
        if (calendars) {
            for (let k in calendars) {
                const bookItem = calendars[k]
                for (let key in bookItem) {
                    const num = moment(moment.unix(bookItem[key].sta_time)
                        .format('YYYY-MM-DD'))
                        .diff(moment(start_date), 'days')

                    const rowID = '.row' + k
                    const tds = document.querySelector(rowID).getElementsByTagName('td')[num]
                    tds.className = 'active'
                    const booked = tds.getElementsByClassName('booked')[0]
                    bookItem[key].dates > 1 ?
                        booked.style.width = 94.5 * bookItem[key].dates + 'px'
                        :
                        booked.style.width = 93 + 'px'

                    booked.getElementsByClassName('book-name')[0].innerHTML = bookItem[key].name
                }
            }
        }
    }

    render() {
        const {roomList} = this.props

        const tds = (length) => {
            let res = []
            for (let i = 0; i < length; i++) {
                res.push(
                    <td key={i}>
                        <div className="booked">
                            <p className="book-name"></p>
                        </div>
                    </td>
                )
            }
            return res
        }

        this.renderRow()

        return (
            <tbody>
            {/*{
                roomList ?
                    roomList.map((item, index) => {
                        if (arr.includes('1')) {
                            const bookItem = this.state.calendars['1']
                            console.log(bookItem)
                            for (let key in bookItem) {
                                const num = moment(moment.unix(bookItem[key].sta_time)
                                    .format('YYYY-MM-DD'))
                                    .diff(moment(start_date), 'days')
                                tdsList = tds(50, num, bookItem[key])
                            }
                        }

                        return (
                            <tr key={index} pos-y={item.id}>
                                {tdsList}
                            </tr>
                        )
                    })
                    : ''
            }*/}
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
    }
}

export default connect(mapStateToProps)(HomeTableTr)