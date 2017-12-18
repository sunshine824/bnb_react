import React, {Component} from 'react'
import {Modal, Form, Input, Icon, Button, Select} from 'antd';

import './style.less'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

let uuid = 0;

class ModelRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    remove(k) {
        const {form} = this.props
        const keys = form.getFieldValue('keys')
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add() {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;

        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    <div className="room-item">
                        {getFieldDecorator(`names[${k}]`, {
                            rules: [{
                                required: true,
                                message: '请输入渠道'
                            }]
                        })(
                            <Input size="large" placeholder="渠道"/>
                        )}
                        <p className="icon">
                            <Icon
                                className="delete"
                                type="minus-circle"
                                onClick={this.remove.bind(this, k)}
                            />
                        </p>
                    </div>
                </FormItem>
            )

        })

        return (
            <Modal
                title="编辑房间"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="item">
                        <p className="item-title">
                            房间名称
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入房间名称'
                                    }]
                                })(
                                    <Input size="large" placeholder="请输入房间名称"/>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">
                            所属房型
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('type_id', {
                                    rules: [{
                                        required: true,
                                        message: '请输入所属房型'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{width: '100%'}}
                                        size="large"
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
                            房间详细地址
                        </p>
                        <FormItem>
                            {getFieldDecorator('address',{
                                rules:[{
                                    required:true,
                                    message:'请填写房间详细地址'
                                }]
                            })(
                                <TextArea placeholder="请填写备注信息" rows={4}/>
                            )}
                        </FormItem>
                    </div>
                    <div className="rooms">
                        {formItems}
                        <Button icon='plus' size="large" className='add-btn' onClick={this.add.bind(this)}>添加渠道</Button>
                    </div>

                    <div className="sure-btn">
                        <Button type="primary" htmlType="submit" className="sure" size="large">
                            确认
                        </Button>
                    </div>
                </Form>
            </Modal>
        )
    }
}

const WrappedModelRoom = Form.create()(ModelRoom);

export default WrappedModelRoom