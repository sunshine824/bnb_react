import React, {Component} from 'react'
import {Button, Radio, DatePicker, Input, Pagination} from 'antd'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderList} from '@/fetch/OrderList'
import moment from 'moment'
import Loading from '@/components/Loading'
import 'moment/locale/zh-cn';

import './style.less'

moment.locale('zh-cn');
const {RangePicker} = DatePicker;
const Search = Input.Search;

class TableData extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            status: '5',  //type类型
            page: 1,  //页码
            content: '',  //搜索内容
            disabled: true,  //是否禁用时期选择
            start_time: '',  //开始时间
            end_time: '',  //结束时间
            orderList: ''
        }
    }

    componentDidMount() {
        this._getOrderList()
    }

    handleTypeChange = (e) => {
        if (e.target.value <= 4) {
            this.setState({
                disabled: true,
                end_time: '',
                start_time: ''
            })
        } else {
            this.setState({
                disabled: false
            })
        }
        this.setState({
            status: e.target.value,
            page: 1
        }, () => {
            this._getOrderList()
        });
    }

    onChange(date, dateString) {
        this.setState({
            start_time: moment(dateString[0]).format('X'),
            end_time: moment(dateString[1]).format('X'),
            page: 1
        }, () => {
            this._getOrderList()
        })
    }

    onSearch(value) {
        this.setState({
            content: value,
            page: 1
        }, () => {
            this._getOrderList()
        })
    }

    onPagaChange(page) {
        this.setState({
            page: page,
        }, () => {
            this._getOrderList()
        });
    }

    //加载订单数据
    _getOrderList() {
        this.setState({orderList: ''})
        const {status, start_time, end_time, content, page} = this.state
        const result = getOrderList(status, start_time, end_time, content, page)
        result.then((res) => {
            return res.json()
        }).then(json => {
            this.setState({
                orderList: json
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        const {orderList} = this.state
        return (
            <div className="data-show">
                <div className="choose-head">
                    <Radio.Group value={this.state.status} onChange={this.handleTypeChange.bind(this)}>
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
                            disabled={this.state.disabled}
                        />
                        <Search
                            placeholder="搜索"
                            onSearch={this.onSearch.bind(this)}
                            enterButton
                            style={{width: 'auto'}}
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
                            <th>订单备注</th>
                            <th>备注颜色</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            orderList ?
                                (
                                    !orderList.status ?
                                        orderList.data.data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.num}</td>
                                                    <td>{item.source_name}</td>
                                                    <td>{moment.unix(item.sta_time).format('YYYY-MM-DD')}</td>
                                                    <td>{moment.unix(item.com_time).format('YYYY-MM-DD')}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.phone}</td>
                                                    <td>￥{item.revenue}</td>
                                                    <td>{item.remark}</td>
                                                    <td>#0000</td>
                                                </tr>
                                            )
                                        })
                                        : <tr>
                                            <td colSpan="9">
                                                暂无数据
                                            </td>
                                        </tr>
                                )
                                : <tr>
                                    <td colSpan="9">
                                        <Loading/>
                                    </td>
                                </tr>
                        }
                        </tbody>
                    </table>
                    <Pagination current={this.state.page} onChange={this.onPagaChange.bind(this)}
                                total={orderList ? (!orderList.status ? orderList.data.total * 10 : 0) : 0}/>
                </div>
            </div>
        )
    }
}

export default TableData