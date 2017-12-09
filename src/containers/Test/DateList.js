import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
//import DateLis from '../../components/DateLis'

moment.locale('zh-cn');

class DateList extends Component {
    constructor(props) {
        super()
        this.state = {
            dataLists: []
        }
    }

    //状态改变时触发
    componentDidUpdate(){
        this.HandleDate()
    }

    HandleDate(){
        console.log(this.props.date)
    }

    render() {
        return (
            <ul>
                {/*<DateLis/>*/}
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


