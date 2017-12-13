import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DatePicker, Select} from 'antd';
import moment from 'moment';
import {update_date} from '@/redux/actions'
import 'moment/locale/zh-cn';

import './style.less'

moment.locale('zh-cn');

const Option = Select.Option;

class ScreenBox extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.HandleDate(1)
    }

    onChange(date, dateString) {
        this.HandleDate(0, dateString)
    }

    HandleDate(isDefault, date) {
        const {dispatch} = this.props
        const dataLists = []

        if (isDefault) {
            //前三天日期
            for (let i = 3; i >= 1; i--) {
                dataLists.push(moment().subtract(i, 'days').format('YYYY-MM-DD dd'))
            }
            //今日日期
            dataLists.push(moment().format('YYYY-MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 46; i++) {
                dataLists.push(moment().add(i, 'days').format('YYYY-MM-DD dd'))
            }
        } else {
            if (!date) return
            //今日日期
            dataLists.push(moment(date).format('YYYY-MM-DD dd'))
            //往后49天
            for (let i = 1; i <= 49; i++) {
                dataLists.push(moment(date).add(i, 'days').format('YYYY-MM-DD dd'))
            }
        }

        //修改dateLists
        dispatch(update_date(dataLists))
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    render() {
        const dateFormat = 'YYYY-MM-DD'
        const allowClear=false
        return (
            <div className="screen-box">
                <div className="box-date">
                    <DatePicker defaultValue={moment(moment(), dateFormat)}
                                onChange={this.onChange.bind(this)}
                                allowClear={allowClear}
                                format={dateFormat}/>
                </div>
                <div className="choose-type">
                    <Select
                        showSearch
                        placeholder="筛选"
                        optionFilterProp="children"
                        onChange={this.handleChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="jack">全选</Option>
                        <Option value="lucy">观景台</Option>
                        <Option value="tom">套二户型</Option>
                    </Select>
                </div>
            </div>
        )
    }
}

export default connect()(ScreenBox)