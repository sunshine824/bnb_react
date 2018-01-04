import React, {Component} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import {Link} from 'react-router-dom'
import {SignIn} from '@/fetch/SignIn'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_user_name} from '@/redux/actions'

import './style.less'

const FormItem = Form.Item;

class signIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        }
    }

    componentDidMount() {
        this.doCheck()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this._signIn(values)
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

    /**
     * 登录提交数据
     * @param data
     * @private
     */
    _signIn(data) {
        const {actions} = this.props
        const result = SignIn(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                actions.save_user_name(data.phone)
                localStorage.setItem('token', json.data)
                this.props.history.push('/')
            }else {
                const error = {}
                json.data.map((item, index) => {
                    const key = Object.keys(item)[0]
                    error[key] = {
                        value: data[key],
                        errors: [new Error(item[key])]
                    }
                    this.props.form.setFields(error)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    doCheck() {
        const token = localStorage.getItem('token')
        if (token) this.goHomePage()
    }

    goHomePage() {
        this.props.history.push('/')
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
                                    }, {
                                        min: 6, message: '密码为至少6位'
                                    }],
                                })(
                                    <Input size="large" prefix={<Icon type="lock" style={{
                                        color: 'rgba(0,0,0,.4)',
                                        fontSize: '16px'
                                    }}/>}
                                           type="password" placeholder="密码为至少6位"/>
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

function mapStateToProps(state) {
    return {
        username: state.save_user_name.username
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_user_name
        }, dispatch)
    }
}

const SignFormIn = Form.create()(signIn)

export default connect(mapStateToProps, mapActionsToProps)(SignFormIn);