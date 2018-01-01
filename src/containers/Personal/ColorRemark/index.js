import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, Form, Input} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'

import './style.less'

const FormItem = Form.Item;

class ColorRemark extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }


    handleCancel = (e) => {
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

    addChannel() {
        this.setState({
            visible: true
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="color-remark">
                <div className="color-head">
                    <h2 className="color-title">颜色备注</h2>
                    <Button type="primary" className='add-channel' onClick={this.addChannel.bind(this)}>新增渠道</Button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>颜色</th>
                        <th>备注名</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <p className="color"></p>
                        </td>
                        <td>默认渠道</td>
                        <td>
                            <Button type="primary" size="small">编辑</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <Modal
                    title="编辑渠道"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width='350px'
                    className="color-modal"
                >
                    <div className="channel-form">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入渠道名称！'}],
                                })(
                                    <div className="item">
                                        <label>渠道名称</label>
                                        <Input placeholder="请输入渠道名称！" className='info-name'/>
                                    </div>
                                )}
                            </FormItem>

                            <div className="sure-btn">
                                <Button type="primary" style={{width: '100%'}} htmlType="submit" className="sure"
                                        size="large">
                                    确认
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal>
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

const ColorFromRemark = Form.create()(ColorRemark)

export default connect(mapStateToProps, mapActionsToProps)(ColorFromRemark)