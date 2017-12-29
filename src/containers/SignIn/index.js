import React, {Component} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import {Link} from 'react-router-dom'

import './style.less'

const FormItem = Form.Item;

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
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

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <div className="sign-container">
                <div className="sign">
                    <div className="signUp" id="components-form-demo-normal-login">
                        <h2 className="sign-title">登录房咚咚网</h2>
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
                                <Button size="large" type="primary" className='login-form-button'
                                        htmlType="submit">登录</Button>
                            </FormItem>
                        </Form>
                        <p className="notice">没有咚咚账号？ <Link to="/signUp">立即注册</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Form.create()(SignUp);