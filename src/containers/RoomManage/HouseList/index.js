import React, {Component} from 'react'
import {Button, message} from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {deleteHouse} from '@/fetch/HouseList'
import Loading from '@/components/Loading'
import ModelEditHouse from '../Model/ModelEditHouse'
import ModelAddHouse from '../Model/ModelAddHouse'
import {editHouseInfo} from '@/fetch/HouseList'

import './style.less'

class HouseManage extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            houseList: '',
            houseAddVisible: false,  //是否显示添加model
            houseEditVisible: false,  //是否显示编辑model
            id: '',
            houseInfo: ''
        }
    }

    componentDidMount() {
    }


    /**
     * 删除房型
     * @param id
     * @private
     */
    _deleteHouse(id) {
        const result = deleteHouse(id)
        //const {houseList} = this.props
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status===0) {
                /*houseList.data.map((item, index) => {
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
                })*/
                this.props._getHouseList()
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
            this.setState({
                houseInfo: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    deleteHouseInfo(k) {
        const {houseInfo} = this.state
        houseInfo.data.houses.splice(k, 1)
        this.setState({
            houseInfo: {
                interpret: houseInfo.interpret,
                status: houseInfo.status,
                data: {
                    abbre: houseInfo.data.abbre,
                    houses: houseInfo.data.houses,
                    id: houseInfo.data.id,
                    name: houseInfo.data.name,
                    status: houseInfo.data.status,
                    user_id: houseInfo.data.user_id
                }
            }
        })
    }

    addHouse() {
        this.setState({
            houseAddVisible: true
        })
    }

    editHouse(id) {
        this.setState({
            id: id,
            houseEditVisible: true
        }, () => {
            if (this.state.id) {
                this.getHouseInfo()
            }
        })
    }

    onChangeEditHouse(visible) {
        this.setState({
            houseEditVisible: visible
        })
    }

    onChangeAddHouse(visible) {
        this.setState({
            houseAddVisible: visible
        })
    }


    render() {
        const {houseList} = this.props
        return (
            <div className="house-manage">
                <div className="callout-head">
                    <h1>房型管理</h1>
                    <Button icon='plus' type="primary" className='add-btn'
                            onClick={this.addHouse.bind(this)}>添加房型</Button>
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
                                                            onClick={this.editHouse.bind(this, item.id)}>编辑</Button>
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
                <ModelEditHouse {...this.state} onChangeHouse={this.onChangeEditHouse.bind(this)}
                                deleteHouseInfo={this.deleteHouseInfo.bind(this)}
                                _getHouseList={this.props._getHouseList.bind(this)}
                                _getRoomList={this.props._getRoomList.bind(this)}/>
                <ModelAddHouse {...this.state} onChangeHouse={this.onChangeAddHouse.bind(this)}
                               _getHouseList={this.props._getHouseList.bind(this)}
                               _getRoomList={this.props._getRoomList.bind(this)}/>
            </div>
        )
    }
}

export default HouseManage