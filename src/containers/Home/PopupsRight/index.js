import React, {Component} from 'react'
import {DatePicker, Form, Radio, Select, Input, Button} from 'antd';

import './style.less'

const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;


class PopupsRight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order_value: 1,
            color_value: 1,
            slide_open: false
        }
    }

    onChangeDate(value, dateString) {
        console.log('Formatted Selected Time: ', dateString);
    }

    onChangeRadio(mold, e) {
        console.log(mold)
        console.log('radio checked', e.target.value);
        if (mold === 'order') {
            this.setState({
                order_value: e.target.value,
            });
        } else if (mold === 'color') {
            this.setState({
                color_value: e.target.value,
            });
        }

    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onBlurInput(mold, e) {
        console.log(mold)
        console.log(e.target.value)
    }

    slideOpen() {
        this.setState({
            slide_open: !this.state.slide_open
        })
    }

    onSubmit() {
        console.log(1)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeValue = fieldsValue['checkIn'];
                const values = {
                    'checkIn': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                };
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const className = this.state.slide_open ? 'active' : ''
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className={"content-slide " + className}>
                    <p className="title">编辑订单</p>
                    <div className="slide-body">

                        <p className="group-title">订单信息</p>
                        <div className="item">
                            <p className="item-title">
                                入住日期
                                <span>共2晚</span>
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('checkIn', {
                                        rules: [{required: true, message: '请选择入住日期'}]
                                    })(
                                        <RangePicker
                                            format="YYYY-MM-DD"
                                            placeholder={['入住日期', '退房日期']}
                                        />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                订单状态
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('status',{
                                        rules:[{required:true, message:'请选择状态'}]
                                    })(
                                        <RadioGroup onChange={this.onChangeRadio.bind(this, 'order')}
                                                    value={this.state.order_value}>
                                            <Radio value={1}>预订</Radio>
                                            <Radio value={2}>屏蔽</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                渠道来源
                            </p>
                            <div className="check_input">
                                <Select
                                    showSearch
                                    style={{width: '100%'}}
                                    placeholder="选择渠道来源"
                                    optionFilterProp="children"
                                    onChange={this.handleChange.bind(this)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="jack">58同城</Option>
                                    <Option value="lucy">优客逸家</Option>
                                    <Option value="tom">居房源</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                订单收入
                            </p>
                            <div className="check_input">
                                <Input addonBefore="￥" placeholder="0" onBlur={this.onBlurInput.bind(this, 'mold')}/>
                            </div>
                        </div>


                        <p className="group-title">入住人信息</p>
                        <div className="item">
                            <p className="item-title">
                                姓名
                            </p>
                            <div className="check_input">
                                <Input placeholder="入住人姓名" onBlur={this.onBlurInput.bind(this, 'name')}/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                电话
                            </p>
                            <div className="check_input">
                                <Input placeholder="入住人电话" onBlur={this.onBlurInput.bind(this, 'phone')}/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                微信号
                            </p>
                            <div className="check_input">
                                <Input placeholder="入住人微信号" onBlur={this.onBlurInput.bind(this, 'weChat')}/>
                            </div>
                        </div>


                        <p className="group-title">订单备注</p>
                        <div className="item">
                            <div className="check_input">
                                <TextArea placeholder="备注信息" rows={4} onBlur={this.onBlurInput.bind(this, 'remark')}/>
                            </div>
                        </div>

                        <p className="group-title">颜色选择</p>
                        <div className="item">
                            <div className="check_input">
                                <RadioGroup onChange={this.onChangeRadio.bind(this, 'color')}
                                            value={this.state.color_value}>
                                    <Radio value={1}></Radio>
                                    <Radio value={2}></Radio>
                                    <Radio value={3}></Radio>
                                    <Radio value={4}></Radio>
                                </RadioGroup>
                            </div>
                        </div>

                    </div>
                    <div className="btn-footer">
                        <Button type="primary" htmlType="submit"
                                style={{float: 'left', width: '100px'}}>确定</Button>
                        <Button onClick={this.slideOpen.bind(this)} style={{float: 'right', width: '100px'}}>取消</Button>
                    </div>
                    <div className="slide-btn" onClick={this.slideOpen.bind(this)}>

                    </div>
                </div>
            </Form>
        )
    }
}


const WrappedPopupsRight = Form.create()(PopupsRight);

export default WrappedPopupsRight