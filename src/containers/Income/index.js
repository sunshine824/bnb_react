import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {Button, Radio, DatePicker, Input, Pagination} from 'antd'
import Loading from '@/components/Loading'
import moment from 'moment'
import 'moment/locale/zh-cn';

import './style.less'

moment.locale('zh-cn');
const {RangePicker} = DatePicker;
const Search = Input.Search;

class Income extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            content: '',
            start_time: '',
            end_time: ''
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    onChange(date, dateString) {
        this.setState({
            start_time: moment(dateString[0]).format('X'),
            end_time: moment(dateString[1]).format('X'),
            page: 1
        })
    }

    onSearch(value) {
        this.setState({
            content: value,
            page: 1
        })
    }

    onPagaChange(page) {
        this.setState({
            page: page,
        });
    }


    render() {
        return (
            <div className='income_show'>
                <div className='show_head'>
                    <h2 className='show-title'>合作收益列表</h2>
                    <div className="date-right">
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={['开始时间', '结束时间']}
                            onChange={this.onChange.bind(this)}
                        />
                        <Search
                            placeholder="搜索"
                            onSearch={this.onSearch.bind(this)}
                            enterButton
                            style={{width: 'auto'}}
                        />
                    </div>
                </div>
                <div className='table-cells'>
                    <table>
                        <thead>
                        <tr>
                            <th>房间号（房型）</th>
                            <th>入住退房时间</th>
                            <th>联系人</th>
                            <th>手机号</th>
                            <th>收益分成</th>
                            <th>分成时间</th>
                            <th>分成详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>102</td>
                            <td>2017-12-30 ~ 2018-01-02</td>
                            <td>陈鑫</td>
                            <td>18040431886</td>
                            <td>10%</td>
                            <td>2018-01-03</td>
                            <td>103房间分成</td>
                        </tr>
                        <tr>
                            <td colSpan='7'>
                                <Loading/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Pagination current={this.state.page} onChange={this.onPagaChange.bind(this)}
                                total='90'/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        states: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_path
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Income)