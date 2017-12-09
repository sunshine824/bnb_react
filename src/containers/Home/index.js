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
        const data=[]
        //前三天日期
        for(let i=3;i>=1;i--){
            data.push(moment("2012-09-01").subtract(i, 'days').format('MM-DD dddd'))
        }
        //今日日期
        data.push(moment("2012-09-01").format('MM-DD dddd'))
        //后46天日期
        for(let i=1;i<=46;i++){
            data.push(moment("2012-09-01").add(i,'days').format('MM-DD dddd'))
        }
        console.log(data)
        //console.log(data)
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