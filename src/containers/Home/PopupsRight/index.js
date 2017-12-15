import React, {Component} from 'react'
import {DatePicker, Radio} from 'antd';

import './style.less'

const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

class PopupsRight extends Component {
    constructor(props) {
        super(props)
        this.state={
            value: 1
        }
    }

    onChange(value, dateString) {
        console.log('Formatted Selected Time: ', dateString);
    }

    render() {
        return (
            <div className="content-slide">
                <p className="title">编辑订单</p>
                <div className="slide-body">
                    <div className="item">
                        <p className="item-title">
                            入住日期
                            <span>共2晚</span>
                        </p>
                        <div className="check_input">
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={['入住日期', '退房日期']}
                                onChange={this.onChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">
                            订单状态
                        </p>
                        <div className="check_input">
                            <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
                                <Radio value={1}>预订</Radio>
                                <Radio value={2}>屏蔽</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PopupsRight