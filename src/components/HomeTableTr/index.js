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
            console.log(json)
            this.setState({
                calendars: json.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        var tdsList = ''
        const {roomList, start_date} = this.props

        const arr = []
        for (var key in this.state.calendars) {
            arr.push(key)
        }

        const tds = (length, num = '', data='') => {
            let res = []
            for (let i = 0; i < length; i++) {
                res.push(
                    <td key={i} className={i === num ? "active" : ''}>
                        <div className="booked" style={{width: 94 * data.dates + 'px'}}>
                            <p className="book-name">{data.name}</p>
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
                    roomList.map((item, index) => {
                        if (arr.includes(item.id.toString())) {
                            const bookItem = this.state.calendars[item.id]
                            for (let key in bookItem) {
                                const num = moment(moment.unix(bookItem[key].sta_time)
                                    .format('YYYY-MM-DD'))
                                    .diff(moment(start_date), 'days')
                                tdsList = tds(50, num, bookItem[key])
                            }
                        } else {
                            tdsList = tds(50)
                        }

                        return (
                            <tr key={index} pos-y={item.id}>
                                {tdsList}
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