import React, {Component} from 'react'
import {Form, Icon, Input, Button, Modal} from 'antd';
import {Link} from 'react-router-dom'
import {signUp, getCode, verifyCode} from '@/fetch/SignUp'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_user_name} from '@/redux/actions'

import './style.less'

const FormItem = Form.Item;

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            visible: false,
            phone: '',
            getImgCode: '',
            codeMsg: '',
            countNum: 60,
            isCount: false,
            isShowPhoneErr: false
        }
    }

    componentDidMount() {
        this.doCheck()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this._signUp(values)
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
        this._verifyCode()
    }

    _signUp(data) {
        const {actions} = this.props
        const result = signUp(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                actions.save_user_info(data.phone)
                this.props.history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 验证图片验证码
     * @private
     */
    _verifyCode() {
        const value = this.refs.imgCodeInput.value
        const result = verifyCode(value, this.state.phone)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status) {
                this.setState({
                    codeMsg: json.interpret
                })
            } else {
                this.setState({
                    visible: false,
                    isCount: true
                }, () => {
                    this.countDown()
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    /**
     * 显示modal
     */
    showModalCode() {
        if (this.state.phone === '') {
            this.props.form.setFields({
                phone:{
                    errors:[new Error('请输入您的手机号！')]
                }
            })
        }
        if (this.state.isCount) return
        const reg = /^1[0-9]{10}$/
        if (reg.test(this.state.phone)) {
            this.setState({
                visible: true
            }, () => {
                this._getCode()
            })
        }
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeCode() {
        this.setState({
            codeMsg: ''
        })
    }

    /**
     * 获取图片验证码
     * @private
     */
    _getCode() {
        const result = getCode(this.state.phone, Date.parse(new Date()))
        this.setState({
            getImgCode: result
        })
    }

    //倒计时60秒
    countDown() {
        if (this.state.isCount) {
            this.timer = setInterval(() => {
                var count = this.state.countNum
                count -= 1;
                if (count < 1) {
                    this.setState({
                        isCount: false
                    });
                    count = 60
                    clearInterval(this.timer)
                }
                this.setState({
                    countNum: count
                })
            }, 1000)
        }
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
        const {getImgCode, codeMsg, isCount, countNum, isShowPhoneErr} = this.state
        var className = ''

        if (codeMsg) {
            className = 'code-input has-error'
        } else {
            className = 'code-input'
        }

        return (
            <div className="sign-container">
                <div className="sign">
                    <div className="signUp" id="components-form-demo-normal-login">
                        <h2 className="sign-title">免费注册房咚咚网</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {required: true, message: '请输入您的手机号！'},
                                        {pattern: '^1[0-9]{10}$', message: '请输入正确手机号'}
                                    ],
                                })(
                                    <Input size="large" prefix={<Icon type="user" style={{
                                        color: 'rgba(0,0,0,.4)',
                                        fontSize: '16px'
                                    }}/>}
                                           style={{width: '100%'}} placeholder="手机号"
                                           onBlur={this.onChangePhone.bind(this)}/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('phone_code', {
                                    rules: [{required: true, message: '请输入验证码！'}],
                                })(
                                    <div className="code">
                                        <input className="code-input ant-input" placeholder="请输入短信验证码"/>
                                        <p className={isCount ? 'code-count' : 'code-start'}
                                           onClick={this.showModalCode.bind(this)}>
                                            获取短信验证码{isCount ? '(' + countNum + ')' : ''}</p>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    initialValue: '',
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
                                           type="text" placeholder="密码为至少6位"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                    initialValue: '',
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
                        <div className={className}>
                            <input onChange={this.onChangeCode.bind(this)} type="text" ref="imgCodeInput"
                                   className="ant-input pic-input"
                                   placeholder="请输入右侧图形验证码"/>
                            <p className="errmsg">{codeMsg}</p>
                        </div>
                        <div className="attach" onClick={this._getCode.bind(this)}>
                            <img src={getImgCode}/>
                        </div>
                    </div>
                </Modal>
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

const SignFormUp = Form.create()(SignUp)

export default connect(mapStateToProps, mapActionsToProps)(SignFormUp);