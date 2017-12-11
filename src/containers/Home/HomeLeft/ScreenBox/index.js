import React, {Component} from 'react'
import {DatePicker, Select} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './style.less'

moment.locale('zh-cn');

const Option = Select.Option;

class ScreenBox extends Component {
    constructor(props) {
        super(props)
    }

    onChange(date, dateString) {
        console.log(date, dateString)
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

export default ScreenBox