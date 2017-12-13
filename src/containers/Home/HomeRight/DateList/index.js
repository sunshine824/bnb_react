import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateLis from '@/components/DateLis'

import './style.less'

class DateList extends Component {
    render() {
        const {dateLists, dispatch} = this.props

        return (
            <ul className="table-date-grid">
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