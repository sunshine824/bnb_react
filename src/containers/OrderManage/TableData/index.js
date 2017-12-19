import React, {Component} from 'react'
import {Button, Radio, DatePicker, Input} from 'antd'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

const {RangePicker} = DatePicker;
const Search = Input.Search;

class TableData extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            value: '1'
        }
    }

    handleSizeChange = (e) => {
        this.setState({value: e.target.value});
    }

    onChange(date, dateString) {

    }

    render() {
        return (
            <div className="data-show">
                <div className="choose-head">
                    <Radio.Group value={this.state.value} onChange={this.handleSizeChange.bind(this)}>
                        <Radio.Button value="1">今日入住</Radio.Button>
                        <Radio.Button value="2">明日入住</Radio.Button>
                        <Radio.Button value="3">今日退房</Radio.Button>
                        <Radio.Button value="4">明日退房</Radio.Button>
                        <Radio.Button value="5">全部订单</Radio.Button>
                        <Radio.Button value="6">回收站</Radio.Button>
                    </Radio.Group>
                    <div className="date-right">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={['开始时间', '结束时间']}
                            onChange={this.onChange.bind(this)}
                            disabled
                        />
                        <Search
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                            enterButton
                            style={{width:'auto'}}
                        />
                    </div>
                </div>
                <div className="table-cells">
                    <table>
                        <thead>
                        <tr>
                            <th>房间号</th>
                            <th>来源</th>
                            <th>入住时间</th>
                            <th>退房时间</th>
                            <th>联系人</th>
                            <th>手机号</th>
                            <th>金额</th>
                            <th>金额订单备注</th>
                            <th>备注颜色</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>馆金泰</td>
                            <td>58同城</td>
                            <td>2017-10-20</td>
                            <td>2017-11-20</td>
                            <td>雷雨么</td>
                            <td>18040431886</td>
                            <td>￥200</td>
                            <td>记得发顺丰</td>
                            <td>#0000</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableData