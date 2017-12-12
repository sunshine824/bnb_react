import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DatePicker} from 'antd';
import moment from 'moment';
import {update_date} from '../../redux/actions/index'

class ChooseDate extends Component {
    constructor(props) {
        super()

    }

    componentDidMount() {
        this.HandleDate(1)
    }

    onChange(date, dateString) {
        this.HandleDate(0, dateString)
    }

    HandleDate(isDefault, date) {
        const {dispatch} = this.props
        const dataLists = []

        if (isDefault) {
            //前三天日期
            for (let i = 3; i >= 1; i--) {
                dataLists.push(moment().subtract(i, 'days').format('MM-DD     dd'))
            }
            //今日日期
            dataLists.push(moment().format('MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 46; i++) {
                dataLists.push(moment().add(i, 'days').format('MM-DD dd'))
            }
        } else {
            if (!date) return
            //今日日期
            dataLists.push(moment(date).format('MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 49; i++) {
                dataLists.push(moment(date).add(i, 'days').format('MM-DD dd'))
            }
        }

        //修改dateLists
        dispatch(update_date(dataLists))
    }

    render() {
        const dateFormat = 'YYYY-MM-DD'

        return (
            <div>
                <DatePicker onChange={this.onChange.bind(this)}
                            format={dateFormat}/>
            </div>
        )
    }
}


export default connect()(ChooseDate)