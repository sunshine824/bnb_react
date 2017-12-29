import React, {Component} from 'react'
import {Form, Icon, Input, Button, Modal} from 'antd';
import {Link} from 'react-router-dom'

import './style.less'

const FormItem = Form.Item;

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不匹配！');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    showModalCode() {
        this.setState({
            visible: true
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <div className="sign-container">
                <div className="sign">
                    <div className="signUp" id="components-form-demo-normal-login">
                        <h2 className="sign-title">免费注册房咚咚网</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: '请输入您的手机号！'}],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{
                                        color: 'rgba(0,0,0,.4)',
                                        fontSize: '16px'
                                    }}/>}
                                           style={{width: '100%'}} placeholder="手机号"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('phone_code', {
                                    rules: [{required: true, message: '请输入验证码！'}],
                                })(
                                    <div className="code">
                                        <input className="code-input ant-input" placeholder="请输入短信验证码"/>
                                        <p className="code-start" onClick={this.showModalCode.bind(this)}>获取短信验证码</p>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: '请输入密码',
                                    }, {
                                        validator: this.checkConfirm,
                                    }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{
                                        color: 'rgba(0,0,0,.4)',
                                        fontSize: '16px'
                                    }}/>}
                                           type="text" placeholder="密码为至少6位"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: '请再次输入密码',
                                    }, {
                                        validator: this.checkPassword,
                                    }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{
                                        color: 'rgba(0,0,0,.4)',
                                        fontSize: '16px'
                                    }}/>}
                                           type="password" onBlur={this.handleConfirmBlur} placeholder="再次输入密码"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button size="large" type="primary" className='login-form-button'
                                        htmlType="submit">注册</Button>
                            </FormItem>
                        </Form>
                        <p className="notice">已有咚咚账号？ <Link to="/signIn" className="signIn">立即登录</Link></p>
                    </div>
                </div>
                <Modal
                    title="图片验证码"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确认"
                    width='350px'
                    className="pic-modal"
                >
                    <div className="pic-code">
                        <input type="text" className="ant-input pic-input" placeholder="请输入右侧图形验证码"/>
                        <div className="attach">
                            <img src="https://www.yunpian.com/captcha?ts=1514541797321"/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default Form.create()(SignUp);