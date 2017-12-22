import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DateLis from '@/components/DateLis'

import './style.less'

class DateList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        const {dateLists} = this.props

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
        dateLists: state.update_date[0] ? state.update_date[0].dateLists : ''
    }
}

export default connect(mapStateToProps)(DateList)