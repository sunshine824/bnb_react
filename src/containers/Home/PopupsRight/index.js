import React, {Component} from 'react'
import {DatePicker, Form, Radio, Select, Input, Button} from 'antd';
import {editCheckIn} from '@/fetch/EditCheckin'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const {TextArea} = Input;


class PopupsRight extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            slide_open: false
        }
    }


    slideOpen() {
        this.setState({
            slide_open: !this.state.slide_open
        })
    }

    /**
     * 提交编辑入住信息
     * @private
     */
    _editCheckIn() {
        const result = editCheckIn()
        result.then(res=>{
            return res.json()
        }).then(json=>{
            console.log(json)
        }).catch(err=>{
            console.log(err)
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeValue = fieldsValue['time'];
                const values = {
                    ...fieldsValue,
                    'time': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
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
                                    {getFieldDecorator('time', {
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
                                    {getFieldDecorator('status', {
                                        rules: [{required: true, message: '请选择状态'}]
                                    })(
                                        <RadioGroup>
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
                                <FormItem>
                                    {getFieldDecorator('source_id', {
                                        rules: [{required: true, message: '请选择渠道来源'}]
                                    })(
                                        <Select
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder="选择渠道来源"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">58同城</Option>
                                            <Option value="lucy">优客逸家</Option>
                                            <Option value="tom">居房源</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                订单收入
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('revenue', {
                                        rules: [{required: true, message: '请输入订单收入'}]
                                    })(
                                        <Input addonBefore="￥" placeholder="0"/>
                                    )}
                                </FormItem>
                            </div>
                        </div>


                        <p className="group-title">入住人信息</p>
                        <div className="item">
                            <p className="item-title">
                                姓名
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: '请输入入住人姓名'}]
                                    })(
                                        <Input placeholder="入住人姓名"/>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                手机号
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {required: true, message: '请输入入住人手机号'},
                                            {pattern: '^1[0-9]{10}$', message: '请输入正确手机号'}
                                        ]
                                    })(
                                        <Input maxLength={11} placeholder="入住人电话"/>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="item">
                            <p className="item-title">
                                微信号
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('wx', {
                                        rules: [{required: true, message: '请输入入住人微信号'}]
                                    })(
                                        <Input placeholder="入住人微信号"/>
                                    )}
                                </FormItem>
                            </div>
                        </div>


                        <p className="group-title">订单备注</p>
                        <div className="item">
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('remark', {
                                        rules: [{required: true, message: '请填写备注信息'}]
                                    })(
                                        <TextArea placeholder="请填写备注信息" rows={4}/>
                                    )}
                                </FormItem>
                            </div>
                        </div>


                        <p className="group-title">颜色选择</p>
                        <div className="item">
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('color_id', {
                                        rules: [{required: true, message: '请选择提示颜色'}]
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}></Radio>
                                            <Radio value={2}></Radio>
                                            <Radio value={3}></Radio>
                                            <Radio value={4}></Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
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