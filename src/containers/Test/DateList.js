import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import DateLis from '../../components/DateLis'

moment.locale('zh-cn');

class DateList extends Component {
    constructor(props) {
        super()
        this.state = {
            dataLists: []
        }
    }

    //状态改变时触发
    componentDidUpdate() {
        this.HandleDate()
    }

    HandleDate() {
        const date = this.props.date
        this.state.dataLists = []
        const dataLists = this.state.dataLists

        //今日日期
        dataLists.push(moment(date).format('MM-DD dddd'))
        //往后49天
        for (let i = 1; i <= 49; i++) {
            dataLists.push(moment(date).add(i, 'days').format('MM-DD dddd'))
        }
    }

    render() {
        const {dataLists} = this.state
        return (
            <ul>
                {
                    dataLists.map((item, index) => {
                        return (
                            <DateLis key={index} item={item}/>
                        )

                    })
                }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        date: state[0] ? state[0].date : ''
    }
}

export default connect(mapStateToProps)(DateList)


