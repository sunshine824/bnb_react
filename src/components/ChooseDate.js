import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DatePicker} from 'antd';
import moment from 'moment';
import {update_date} from '../redux/actions'

class ChooseDate extends Component {
    constructor(props) {
        super()

    }

    onChange(date, dateString) {
        const {dispatch} = this.props
        //修改date
        dispatch(update_date(dateString))
    }

    render() {
        const dateFormat = 'YYYY/MM/DD'

        return (
            <div>
                <DatePicker onChange={this.onChange.bind(this)}
                            format={dateFormat}/>
            </div>
        )
    }
}


export default connect()(ChooseDate)