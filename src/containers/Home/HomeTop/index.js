import React, {Component} from 'react'
import ScreenBox from './ScreenBox'
import DateList from './DateList'

import './style.less'

class HomeTop extends Component {

    componentDidMount() {
        this.ChildHandleCalendar()
    }

    ChildHandleCalendar() {
        this.refs['calendar'].wrappedInstance.getCalendarData()
    }

    render() {
        return (
            <div className="home-top">
                <ScreenBox ref={"calendar"}/>
                <DateList/>
            </div>
        )
    }
}

export default HomeTop