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
        const {dateLists, scrollLeft} = this.props

        return (
            <ul className="table-date-grid" style={{left: -scrollLeft + 'px'}}>
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
        dateLists: state.update_date.dateLists ? state.update_date.dateLists : '',
        scrollLeft: state.save_scroll.scrollLeft ? state.save_scroll.scrollLeft : 0
    }
}

export default connect(mapStateToProps)(DateList)