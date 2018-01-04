import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, Form, Input, message} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {getSourcesList, deleteSource, editSource, sourceInfo, addSource} from '@/fetch/ChannelSet'
import Loading from '@/components/Loading'

import './style.less'

const FormItem = Form.Item;

class ChannelSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            sourceList: '',
            mold: '',
            id: '',
            sourceInfo: ''
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)

        this._getSourcesList()
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
                if (this.state.mold === 'add') {
                    this._addSource(values)
                } else {
                    values.id = this.state.id
                    this._editSource(values)
                }
            }
        });
    }

    //操作渠道
    editChannel(mold, id) {
        this.setState({
            visible: true,
            mold: mold,
            id: id
        })
        if (mold === 'edit') {
            this._sourceInfo(id)
        }
    }

    /**
     * 获取渠道列表
     * @private
     */
    _getSourcesList() {
        const result = getSourcesList()
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                sourceList: json
            })
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 添加渠道
     * @private
     */
    _addSource(data) {
        const result = addSource(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                message.success('添加成功！')
                this.setState({
                    visible: false
                })
                this._getSourcesList()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 删除渠道
     * @param id
     * @private
     */
    _deleteSource(id) {
        const result = deleteSource(id)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                message.success('删除成功！')
                this._getSourcesList()
            }
        })
    }

    /**
     * 编辑返回信息
     * @param id
     * @private
     */
    _sourceInfo(id) {
        const result = sourceInfo(id)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                this.setState({
                    sourceInfo: json
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    _editSource(data) {
        const result = editSource(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                message.success('编辑成功！')
                this.setState({
                    visible: false
                })
                this._getSourcesList()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {sourceList, mold, sourceInfo} = this.state

        return (
            <div className="channel-set">
                <div className="channel-head">
                    <h2 className="channel-title">渠道设置</h2>
                    <Button type="primary" className='add-channel'
                            onClick={this.editChannel.bind(this, 'add', '')}>新增渠道</Button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>渠道名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sourceList ?
                            (
                                !sourceList.status ?
                                    sourceList.data.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.source}</td>
                                                <td>
                                                    <Button type="primary" size="small"
                                                            style={{marginRight: '10px'}}
                                                            onClick={this.editChannel.bind(this, 'edit', item.id)}>编辑</Button>
                                                    <Button size="small"
                                                            onClick={this._deleteSource.bind(this, item.id)}>删除</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        <td colSpan="2">
                                            暂无数据
                                        </td>
                                    </tr>
                            )
                            : <tr>
                                <td colSpan="2">
                                    <Loading/>
                                </td>
                            </tr>
                    }
                    </tbody>
                </table>

                <Modal
                    title={mold === 'add' ? '添加渠道' : '编辑渠道'}
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
                                <div className="item">
                                    <label>渠道名称</label>
                                    {getFieldDecorator('source', {
                                        initialValue: sourceInfo.data ? sourceInfo.data.source : '',
                                        rules: [{required: true, message: '请输入渠道名称！'}],
                                    })(
                                        <Input placeholder="请输入渠道名称！" className='info-name'/>
                                    )}
                                </div>
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