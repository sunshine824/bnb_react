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
        return (
            <div className="room-list" style={{top: -scrollTop + 'px'}}>
                <ul>
                    {
                        roomList ?
                            roomList.map((item, index) => {
                                return (
                                    <HouseItem key={index} {...item}/>
                                )
                            })
                            : ''
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roomList: state.house_type[0] ? state.house_type[0].roomList : '',
        scrollTop: state.save_scroll.scrollTop ? state.save_scroll.scrollTop : 0
    }
}

export default connect(mapStateToProps)(HouseList)