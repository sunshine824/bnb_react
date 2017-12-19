import React, {Component} from 'react'
import {Button} from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getHouseListData, deleteHouse} from '@/fetch/HouseList'
import Loading from '@/components/Loading'

import './style.less'

class HouseManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            houseList: ''
        }
    }

    componentDidMount() {
        this._getHouseList()
    }

    _getHouseList() {
        const result = getHouseListData()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                houseList: json
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    _deleteHouse(id) {
        const result = deleteHouse(id)
        const {houseList} = this.state
        result.then(res => {
            return res.json()
        }).then(json => {
            houseList.data.map((item, index) => {
                if (item.id === id) {

                }
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        const {houseList} = this.state
        return (
            <div className="house-manage">
                <div className="callout-head">
                    <h1>房型管理</h1>
                    <Button icon='plus' type="primary" className='add-btn'>添加房型</Button>
                </div>
                <div className="house-type">
                    <table>
                        <thead>
                        <tr>
                            <th style={{width: '200px'}}>房型</th>
                            <th style={{width: '170px'}}>简称</th>
                            <th style={{width: '140px'}}>房间数</th>
                            <th>房间号</th>
                            <th style={{width: '220px'}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            houseList ?
                                !houseList.status ?
                                    houseList.data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.abbre}</td>
                                                <td>{item.num}</td>
                                                <td>{item.houses}</td>
                                                <td>
                                                    <Button type="primary" size="small"
                                                            style={{marginRight: '10px'}}>编辑</Button>
                                                    <Button size="small"
                                                            onClick={this._deleteHouse.bind(this, item.id)}>删除</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        <td colspan="5">
                                            暂无数据
                                        </td>
                                    </tr>
                                : <tr>
                                    <td colSpan="5">
                                        <Loading/>
                                    </td>
                                </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HouseManage