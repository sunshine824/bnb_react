import React, {Component} from 'react'
import {DatePicker, Form, Radio, Select, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {show_popup} from '@/redux/actions'
import {editCheckIn, addCheckIn} from '@/fetch/EditCheckin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import moment from 'moment'
import {getSourceList} from '@/fetch/SourceList'

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
            slide_open: false,
            sources: ''
        }
    }

    componentDidMount() {
        this._getSourceList()
    }

    slideOpen() {
        const {actions} = this.props
        actions.show_popup([!this.props.show_popup])
    }

    /**
     * 提交编辑入住信息
     * @private
     */
    _editCheckIn() {
        const result = editCheckIn()
        result.then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 添加入住
     * @private
     */
    _addCheckIn(data) {
        const result = addCheckIn(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                message.success('添加成功')
            } else {
                message.error('添加失败')
            }
        }).catch(err => {
            console.log(err)
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        const {id} = this.props
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeValue = fieldsValue['time'];
                const values = {
                    ...fieldsValue,
                    'time': [rangeValue[0].format('X'), rangeValue[1].format('X')]
                };
                values.house_id = id
                this._addCheckIn(values)
            }
        });
    }

    //获取渠道来源
    _getSourceList() {
        const result = getSourceList()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                sources: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {show_popup, id, date, editInfo} = this.props
        const {sources} = this.state
        const className = this.props.show_popup ? 'active' : ''
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
                                        initialValue: date ? [moment(moment(date), 'YYYY-MM-DD'), moment(moment(date).add(1, 'days'), 'YYYY-MM-DD')] : '',
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
                                        initialValue: 1,
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
                                            {
                                                sources ?
                                                    !sources.status ?
                                                        sources.data.map((item, index) => {
                                                            return (
                                                                <Option key={index} value={item.id}>
                                                                    {item.source}
                                                                </Option>
                                                            )
                                                        })
                                                        : ''
                                                    : ''
                                            }
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
                                        initialValue: '0',
                                        rules: [{required: false, message: '请输入订单收入'}]
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
                                        initialValue: '',
                                        rules: [{required: false, message: '请输入入住人姓名'}]
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
                                        initialValue: '',
                                        rules: [
                                            {required: false, message: '请输入入住人手机号'},
                                            {pattern: '^1[0-9]{10}$', message: '请输入正确手机号'}
                                        ]
                                    })(
                                        <Input maxLength="11" placeholder="入住人电话"/>
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
                                        initialValue: '',
                                        rules: [{required: false, message: '请输入入住人微信号'}]
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
                                        initialValue: '',
                                        rules: [{required: false, message: '请填写备注信息'}]
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
                                        initialValue: '2',
                                        rules: [{required: true, message: '请选择提示颜色'}]
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}/>
                                            <Radio value={2}/>
                                            <Radio value={3}/>
                                            <Radio value={4}/>
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

function mapStateToProps(state) {
    return {
        show_popup: state.show_popup.popup ? state.show_popup.popup : false,
        id: state.show_popup.id ? state.show_popup.id : 0,
        date: state.show_popup.date ? state.show_popup.date : '',
        editInfo: state.show_popup.editInfo ? state.show_popup.editInfo : ''
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            show_popup
        }, dispatch)
    }
}


const WrappedPopupsRight = Form.create()(PopupsRight);

export default connect(mapStateToProps, mapActionsToProps)(WrappedPopupsRight)