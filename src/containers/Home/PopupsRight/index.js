import React, {Component} from 'react'
import { DatePicker } from 'antd';

import './style.less'

const { RangePicker } = DatePicker;

class PopupsRight extends Component {
    constructor(props){
        super(props)
    }
    onChange(value,dateString){
        console.log('Formatted Selected Time: ', dateString);
    }
    render(){
        return(
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
                </div>
            </div>
        )
    }
}

export default PopupsRight