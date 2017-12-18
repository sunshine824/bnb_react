import React, {Component} from 'react'
import HomeTableTr from '@/components/HomeTableTr'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HoverBox from '@/components/HoverBox'

import './style.less'

class TableList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            left: 0,
            top: -900,
            isShow: false
        }
    }

    handleOffset(left, top, isShow) {
        this.setState({
            left: left,
            top: top,
            isShow: isShow
        })
    }

    render() {
        return (
            <div className="content-box-grid">
                <table className="table-roomcell-grid">
                    <HomeTableTr handleOffset={this.handleOffset.bind(this)}/>
                </table>
                <HoverBox {...this.state}/>
            </div>
        )
    }
}

export default TableList