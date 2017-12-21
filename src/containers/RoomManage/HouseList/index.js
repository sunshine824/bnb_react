import React, {Component} from 'react'
import {Button, message} from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getHouseListData, deleteHouse} from '@/fetch/HouseList'
import Loading from '@/components/Loading'
import ModelHouse from '../Model/ModelHouse'
import {editHouseInfo} from '@/fetch/HouseList'

import './style.less'

class HouseManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            houseList: '',
            houseVisible: false,
            mold: 'add',
            id: '',
            houseInfo: ''
        }
    }

    componentDidMount() {
        this._getHouseList()
    }

    /**
     * 获取房型列表
     * @private
     */
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

    /**
     * 删除房型
     * @param id
     * @private
     */
    _deleteHouse(id) {
        const result = deleteHouse(id)
        const {houseList} = this.state
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                houseList.data.map((item, index) => {
                    if (item.id === id) {
                        houseList.data.splice(index, 1)
                        this.setState({
                            houseList: {
                                data: houseList.data,
                                interpret: houseList.interpret,
                                status: houseList.status
                            }
                        })
                    }
                })
            } else {
                message.warning(json.interpret);
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    /**
     * 获取房型编辑信息
     */
    getHouseInfo() {
        const result = editHouseInfo(this.state.id)
        result.then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            this.setState({
                houseInfo: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    deleteHouseInfo(k) {
        const {houseInfo} = this.state
        houseInfo.data.houses.splice(k,1)
        this.setState({
            houseInfo: {
                interpret: houseInfo.interpret,
                status: houseInfo.status,
                data: {
                    abbre: houseInfo.data.abbre,
                    houses: houseInfo.data.houses,
                    id:houseInfo.data.id,
                    name:houseInfo.data.name,
                    status:houseInfo.data.status,
                    user_id:houseInfo.data.user_id
                }
            }
        })
    }

    addHouse(mold) {
        this.setState({
            mold: mold,
            houseVisible: true
        })
    }

    editHouse(mold, id) {
        this.setState({
            mold: mold,
            id: id,
            houseVisible: true
        }, () => {
            if (this.state.id) {
                this.getHouseInfo()
            }
        })
    }

    onChangeHouse(visible) {
        this.setState({
            houseVisible: visible
        })
    }

    render() {
        const {houseList} = this.state
        return (
            <div className="house-manage">
                <div className="callout-head">
                    <h1>房型管理</h1>
                    <Button icon='plus' type="primary" className='add-btn'
                            onClick={this.addHouse.bind(this, 'add')}>添加房型</Button>
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
                                                            style={{marginRight: '10px'}}
                                                            onClick={this.editHouse.bind(this, 'edit', item.id)}>编辑</Button>
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
                <ModelHouse {...this.state} onChangeHouse={this.onChangeHouse.bind(this)}
                            deleteHouseInfo={this.deleteHouseInfo.bind(this)}
                            _getHouseList={this._getHouseList.bind(this)}/>
            </div>
        )
    }
}

export default HouseManage