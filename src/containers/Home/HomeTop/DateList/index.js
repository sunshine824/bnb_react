import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DateLis from '@/components/DateLis'
import moment from 'moment'

import './style.less'

class DateList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }


    render() {
        const {house_calendar, scrollLeft,} = this.props

        const Lis = () => {
            const res = []
            for (let key in house_calendar) {
                res.push(<DateLis key={key} date={moment.unix(key).format('MM-DD')} room={house_calendar[key]}/>)
            }
            return res
        }

        return (
            <ul className="table-date-grid" style={{left: -scrollLeft + 'px'}}>
                {Lis()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        house_calendar: state.calendar_data.calendar ? state.calendar_data.calendar.data ? state.calendar_data.calendar.data.house_calendar : '' : '',
        scrollLeft: state.save_scroll.scrollLeft ? state.save_scroll.scrollLeft : 0,
        //remain_house: state.save_remain_house
    }
}

export default connect(mapStateToProps)(DateList)