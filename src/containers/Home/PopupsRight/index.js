import React, {Component} from 'react'
import {DatePicker, Form, Radio, Select, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {show_popup} from '@/redux/actions'
import {editCheckIn, addCheckIn, deleteCheckIn} from '@/fetch/EditCheckin'
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

    slideOpen(mold) {
        const {actions, id} = this.props
        const tds = document.querySelectorAll('#room_cell' + id + ' td')
        actions.show_popup([!this.props.show_popup])
        if (mold === 'cancel') {
            for (let i = 0; i < tds.length; i++) {
                this.removeClass(tds[i], 'seleted')
            }
        }
    }

    /**
     * 提交编辑入住信息
     * @private
     */
    _editCheckIn(data) {
        const result = editCheckIn(data)
        const {actions} = this.props
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                message.success('添加成功')
                this.props.HandleCalendar()
                actions.show_popup([!this.props.show_popup])
            } else {
                message.error('添加失败')
            }
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
        const {actions, id} = this.props
        const tds = document.querySelectorAll('#room_cell' + id + ' td')

        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                message.success('添加成功')
                for (let i = 0; i < tds.length; i++) {
                    this.removeClass(tds[i], 'seleted')
                }
                this.props.HandleCalendar()
                actions.show_popup([!this.props.show_popup])
            } else {
                message.error('添加失败')
            }
        }).catch(err => {
            console.log(err)
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        const {id, order_id} = this.props
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeValue = fieldsValue['time'];
                const values = {
                    ...fieldsValue,
                    'time': [rangeValue[0].format('X'), rangeValue[1].format('X')]
                };
                if (order_id) {
                    values.id = order_id
                    this._editCheckIn(values)
                } else {
                    values.house_id = id
                    this._addCheckIn(values)
                }
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

    //删除订单
    deleteOrder() {
        const {order_id, actions} = this.props
        const result = deleteCheckIn(order_id)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.props.HandleCalendar()
                actions.show_popup([!this.props.show_popup])
                message.success('删除成功！')
            } else {
                message.warn('删除失败！')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    //原生js实现是否有class
    hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    //实现添加class
    addClass(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    }

    //实现移除class
    removeClass(obj, cls) {
        if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    render() {
        const {show_popup, id, date, editInfo, arrDate, order_id} = this.props

        const {sources} = this.state
        const className = this.props.show_popup ? 'active' : ''
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <div className={"content-slide " + className}>
                    <p className="title">
                        {order_id ? '编辑订单' : '添加订单'}
                        {order_id ?
                            <Button onClick={this.deleteOrder.bind(this)}
                                    style={{float: 'right', marginTop: '5px', marginRight: '15px'}}>删除订单</Button>
                            : ''}
                    </p>
                    <div className="slide-body">

                        <p className="group-title">订单信息</p>
                        <div className="item">
                            <p className="item-title">
                                入住日期
                                <span>共
                                    {
                                        order_id ?
                                            editInfo.data ?
                                                editInfo.data.dates
                                                : ''
                                            : moment(moment(arrDate[1] ? arrDate[1] : arrDate[0])
                                            .format('YYYY-MM-DD'))
                                            .diff(arrDate[0], 'days') + 1
                                    }
                                    晚</span>
                            </p>
                            <div className="check_input">
                                <FormItem>
                                    {getFieldDecorator('time', {
                                        initialValue: order_id ?
                                            [moment(moment.unix(editInfo.data ? editInfo.data.sta_time : '').format('YYYY-MM-DD')), moment(moment.unix(editInfo.data ? editInfo.data.com_time : '').format('YYYY-MM-DD'))]
                                            : !date && !arrDate ?
                                                [moment(moment(), 'YYYY-MM-DD'), moment(moment().add(1, 'days'), 'YYYY-MM-DD')]
                                                : [moment(moment(arrDate[0]), 'YYYY-MM-DD'), moment(moment(arrDate[1] ? arrDate[1] : arrDate[0]).add(1, 'days'), 'YYYY-MM-DD')],
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.status
                                                : ''
                                            : 1,
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.source_id
                                                : ''
                                            : '',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.revenue
                                                : ''
                                            : '0',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.name
                                                : ''
                                            : '',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.phone
                                                : ''
                                            : '',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.wx
                                                : ''
                                            : '',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.remark
                                                : ''
                                            : '',
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
                                        initialValue: order_id ?
                                            editInfo.data ?
                                                editInfo.data.color_id
                                                : ''
                                            : 1,
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
                        <Button onClick={this.slideOpen.bind(this, 'cancel')} style={{float: 'right', width: '100px'}}>取消</Button>
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
        editInfo: state.show_popup.editInfo ? state.show_popup.editInfo : '',
        order_id: state.show_popup.order_id ? state.show_popup.order_id : '',
        arrDate: state.show_popup.arrDate ? state.show_popup.arrDate : '',
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