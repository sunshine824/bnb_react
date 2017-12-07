import React, {Component} from 'react'
import {testData} from '../../fetch/test'
import {LocaleProvider, DatePicker } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './style.less'

const { RangePicker } = DatePicker;

moment.locale('zh-cn');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }

    onOk(value){
        console.log('onOk: ', value);
    }

    onChange(value,dateString){
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    componentDidMount(){
        //fetch请求测试
        const result=testData('494a4b33584f3652355a686e7957344a4e48535578413d3d0a')
        result.then((res)=>{
            return res.json()
        }).then(json=>{
            console.log(json)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    render(){
        return(
            <LocaleProvider locale={zhCN}>
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['Start Time', 'End Time']}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </LocaleProvider>
        )
    }
}