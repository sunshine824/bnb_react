import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, Form, Input} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'

import './style.less'

const FormItem = Form.Item;

class ChannelSet extends Component {
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
            <div className="channel-set">
                <div className="channel-head">
                    <h2 className="channel-title">渠道设置</h2>
                    <Button type="primary" className='add-channel' onClick={this.addChannel.bind(this)}>新增渠道</Button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>渠道名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>默认渠道</td>
                        <td>
                            <Button type="primary" size="small"
                                    style={{marginRight: '10px'}}>编辑</Button>
                            <Button size="small">删除</Button>
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
                    className="channel-modal"
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

const ChannelFromSet = Form.create()(ChannelSet)

export default connect(mapStateToProps, mapActionsToProps)(ChannelFromSet)