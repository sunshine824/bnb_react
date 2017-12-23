import React, {Component} from 'react'
import HomeTableTr from '@/components/HomeTableTr'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_scroll} from '@/redux/actions'
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

    componentDidMount() {

    }

    handleOffset(left, top, isShow) {
        this.setState({
            left: left,
            top: top,
            isShow: isShow
        })
    }

    handleScroll(e) {
        const {actions} = this.props
        let scrollTop = this.refs.tableCon.scrollTop;  //滚动条滚动高度
        let scrollLeft = this.refs.tableCon.scrollLeft; //滚动左侧距离
        actions.save_scroll({scrollTop, scrollLeft})
    }

    render() {
        const {roomList} = this.props
        return (
            <div className="content-box-grid" onScroll={this.handleScroll.bind(this)} ref="tableCon">
                <table className="table-roomcell-grid">
                    {/*<tbody>
                    {
                        roomList ?
                            (
                                !roomList.status ?
                                    roomList.data.map((item, index) => {
                                        return (
                                            <HomeTableTr {...this.state} key={index}
                                                         handleOffset={this.handleOffset.bind(this)}/>
                                        )
                                    })
                                    : ''
                            )
                            : '加载中...'
                    }
                    </tbody>*/}
                    <HomeTableTr handleOffset={this.handleOffset.bind(this)}/>
                </table>
                <HoverBox {...this.state}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomList: state.save_Rooms.roomList ? state.save_Rooms.roomList : '',
        state: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_scroll
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(TableList)