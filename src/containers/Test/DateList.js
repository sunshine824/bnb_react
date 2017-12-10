import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import 'moment/locale/zh-cn';
import DateLis from '../../components/DateLis'

moment.locale('zh-cn');

class DateList extends Component {
    constructor(props) {
        super()
    }

    //状态改变时触发
    componentDidMount() {
        this.HandleDate()
    }

    HandleDate() {

    }

    render() {
        const {dateLists,dispatch} = this.props
        return (
            <ul>
                {
                    dateLists ?
                        dateLists.map((item, index) => {
                            return (
                                <DateLis key={index} item={item}/>
                            )

                        })
                        : ''
                }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        dateLists: state[0] ? state[0].dateLists : ''
    }
}

export default connect(mapStateToProps)(DateList)


