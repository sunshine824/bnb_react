import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Form, Input, message} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {save_user_name} from '@/redux/actions'
import {editpwd} from '@/fetch/RePassword'

import './style.less'

const FormItem = Form.Item;

class RePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this._editPwd(values)
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password2')) {
            callback('两次密码不匹配！');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['re-password2'], {force: true});
        }
        callback();
    }

    _editPwd(data) {
        const {actions} = this.props
        const result = editpwd(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                message.success('修改成功！请重新登录')
                //localStorage.removeItem('token')
                actions.save_user_name('')
                this.props.history.push('/signIn')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="re-password">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        <div className="item">
                            <label>旧密码</label>
                            {getFieldDecorator('password1', {
                                rules: [{required: true, message: '请输入原密码！'}],
                            })(
                                <Input type="text" placeholder="请输入原密码！" className='info-name'/>
                            )}
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className="item">
                            <label>新密码</label>
                            {getFieldDecorator('password2', {
                                rules: [{
                                    required: true, message: '请输入密码',
                                }, {
                                    validator: this.checkConfirm,
                                }, {
                                    min: 6, message: '密码为至少6位'
                                }],
                            })(
                                <Input type="text" placeholder="请输入新密码！" className='info-name'/>
                            )}
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className="item">
                            <label>确认密码</label>
                            {getFieldDecorator('re-password2', {
                                rules: [{
                                    required: true, message: '请再次输入密码',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="text" placeholder="再次输入密码！" onBlur={this.handleConfirmBlur}
                                       className='info-name'/>
                            )}
                        </div>
                    </FormItem>
                    <Button type="primary" htmlType="submit"
                            style={{float: 'left', width: '100%'}}>保存</Button>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_path,
            save_user_name
        }, dispatch)
    }
}

const ReFormPassword = Form.create()(RePassword)

export default connect(mapStateToProps, mapActionsToProps)(ReFormPassword)