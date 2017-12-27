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
        const {dateLists, scrollLeft, remain_house} = this.props

        const Lis = () => {
            const res = []
            for (let key in remain_house) {
                res.push(<DateLis key={key} date={key.slice(5)} room={remain_house[key]}/>)
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
        dateLists: state.update_date.dateLists ? state.update_date.dateLists : '',
        scrollLeft: state.save_scroll.scrollLeft ? state.save_scroll.scrollLeft : 0,
        remain_house: state.save_remain_house
    }
}

export default connect(mapStateToProps)(DateList)