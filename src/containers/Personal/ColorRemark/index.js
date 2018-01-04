import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal, Form, Input, message} from 'antd'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import {getColorList, editColor} from '@/fetch/GetColorList'
import Loading from '@/components/Loading'

import './style.less'

const FormItem = Form.Item;

class ColorRemark extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            colorList: '',
            id: '',
            colorInfo: ''
        }
    }

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)

        this._getColorList()
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
                values.id = this.state.id
                this._editColor(values)
            }
        });
    }

    editColor(id) {
        this.setState({
            visible: true,
            id: id
        })
        this.state.colorList.data.map((item, index) => {
            if (item.id === id) {
                this.setState({
                    colorInfo: item
                })
            }
        })
    }

    _getColorList() {
        const result = getColorList()
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                this.setState({
                    colorList: json
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    /**
     * 编辑颜色备注
     * @param data
     * @private
     */
    _editColor(data) {
        const result = editColor(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                message.success('编辑成功！')
                this.setState({
                    visible: false
                })
                this._getColorList()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {colorList, colorInfo} = this.state

        return (
            <div className="color-remark">
                <div className="color-head">
                    <h2 className="color-title">颜色备注</h2>
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
                    {
                        colorList ?
                            (
                                !colorList.status ?
                                    colorList.data.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <p className="color" style={{backgroundColor: item.color}}></p>
                                                </td>
                                                <td>{item.remark}</td>
                                                <td>
                                                    <Button type="primary" size="small"
                                                            onClick={this.editColor.bind(this, item.id)}>编辑</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        <td colSpan="3">
                                            暂无数据
                                        </td>
                                    </tr>
                            )
                            : <tr>
                                <td colSpan="3">
                                    <Loading/>
                                </td>
                            </tr>
                    }
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
                    <div className="color-form">
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <p className="color" style={{backgroundColor: colorInfo.color}}></p>
                            <FormItem>
                                <div className="item">
                                    <label>备注名称</label>
                                    {getFieldDecorator('remark', {
                                        initialValue: colorInfo.remark,
                                        rules: [{required: true, message: '请输入备注名称！'}],
                                    })(
                                        <Input placeholder="请输入备注名称！" className='info-name'/>
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

const ColorFromRemark = Form.create()(ColorRemark)

export default connect(mapStateToProps, mapActionsToProps)(ColorFromRemark)