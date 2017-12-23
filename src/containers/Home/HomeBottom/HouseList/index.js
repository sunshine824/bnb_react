import React, {Component} from 'react'
import {connect} from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HouseItem from '@/components/HouseItem'

import './style.less'

class HouseList extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            roomList: []
        }
    }

    componentDidMount() {
    }


    render() {
        const {roomList, scrollTop} = this.props
        console.log(roomList)
        return (
            <div className="room-list" style={{top: -scrollTop + 'px'}}>
                <ul>
                    {
                        roomList ?
                            (
                                !roomList.status ?
                                    roomList.data.map((item, index) => {
                                        return (
                                            <HouseItem key={index} {...item}/>
                                        )
                                    })
                                    : '暂无房间'
                            )
                            : '加载中...'
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomList: state.save_Rooms.roomList ? state.save_Rooms.roomList : '',
        scrollTop: state.save_scroll.scrollTop ? state.save_scroll.scrollTop : 0
    }
}

export default connect(mapStateToProps)(HouseList)