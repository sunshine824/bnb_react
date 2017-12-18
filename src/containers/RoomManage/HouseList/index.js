import React, {Component} from 'react'
import { Button } from 'antd';

import './style.less'

class HouseManage extends Component {
    render() {
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
                            <th style={{width:'200px'}}>房型</th>
                            <th style={{width:'170px'}}>简称</th>
                            <th style={{width:'140px'}}>房间数</th>
                            <th>房间号</th>
                            <th style={{width:'220px'}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>观景台</td>
                            <td>观景</td>
                            <td>10</td>
                            <td>荣华 / 4-2905 / 107 / 109 / 111</td>
                            <td>
                                <Button type="primary" size="small" style={{marginRight:'10px'}}>编辑</Button>
                                <Button size="small">删除</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>观景台</td>
                            <td>观景</td>
                            <td>10</td>
                            <td></td>
                            <td>
                                <Button type="primary" size="small" style={{marginRight:'10px'}}>编辑</Button>
                                <Button size="small">删除</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>观景台</td>
                            <td>观景</td>
                            <td>10</td>
                            <td>荣华 / 4-2905 / 107 / 109 / 111</td>
                            <td>
                                <Button type="primary" size="small" style={{marginRight:'10px'}}>编辑</Button>
                                <Button size="small">删除</Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HouseManage