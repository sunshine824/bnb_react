import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button,Form,Input} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'

import './style.less'

const FormItem = Form.Item;

class RePassword extends Component {

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="re-password">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('password1', {
                            rules: [{required: true, message: '请输入原密码！'}],
                        })(
                            <div className="item">
                                <label>旧密码</label>
                                <Input placeholder="请输入原密码！" className='info-name'/>
                            </div>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password2', {
                            rules: [{required: true, message: '请输入新密码！'}],
                        })(
                            <div className="item">
                                <label>新密码</label>
                                <Input placeholder="请输入新密码！" className='info-name'/>
                            </div>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('re-password2', {
                            rules: [{required: true, message: '请再次输入密码！'}],
                        })(
                            <div className="item">
                                <label>确认密码</label>
                                <Input placeholder="再次输入密码！" className='info-name'/>
                            </div>
                        )}
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
            save_path
        }, dispatch)
    }
}

const ReFormPassword=Form.create()(RePassword)

export default connect(mapStateToProps, mapActionsToProps)(ReFormPassword)