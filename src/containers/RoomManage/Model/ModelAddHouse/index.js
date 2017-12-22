import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Modal, Form, Input, Icon, Button, message} from 'antd';
import {addHouse, editHouse, deteleRoom} from '@/fetch/HouseList'

import './style.less'

const FormItem = Form.Item;

let uuid = 0;

class ModelHouse extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    handleCancel = (e) => {
        this.props.onChangeHouse(false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this._addHouse(values)
            }
        });
    }

    /**
     * 添加房型
     * @param values
     * @private
     */
    _addHouse(values) {
        const result = addHouse(values)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.props.onChangeHouse(false)
                this.props._getHouseList()
                this.props._getRoomList()
                message.success('添加成功！');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    remove(k) {
        const {form} = this.props
        const keys = form.getFieldValue('keys')
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add() {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        const {houseAddVisible} = this.props
        const {getFieldDecorator, getFieldValue} = this.props.form;

        getFieldDecorator('keys', {initialValue: []});
        let keys = getFieldValue('keys');

        const decorator = (k) => {
            return `houses[${k}]`
        }

        const formItems = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    <div className="room-item">
                        {getFieldDecorator(decorator(k, index), {
                            initialValue:'',
                            rules: [{
                                required: true,
                                message: '请输入房间号'
                            }]
                        })(
                            <Input size="large" placeholder="房间号"/>
                        )}
                        <p className="icon">
                            <Icon
                                className="delete"
                                type="minus-circle"
                                onClick={this.remove.bind(this, k)}
                            />
                        </p>
                    </div>
                </FormItem>
            )

        })

        return (
            <Modal
                title='添加房型'
                visible={houseAddVisible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="item">
                        <p className="item-title">
                            房间名称
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输入房间名称'
                                    }]
                                })(
                                    <Input size="large" placeholder="请输入房间名称"/>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">
                            简称 （4字以内）
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('abbre', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输入简称'
                                    }]
                                })(
                                    <Input maxLength="4" size="large" placeholder="请输入简称"/>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="rooms">
                        {formItems}
                        <Button icon='plus' size="large" className='add-btn' onClick={this.add.bind(this)}>添加房间</Button>
                    </div>

                    <div className="sure-btn">
                        <Button type="primary" htmlType="submit" className="sure" size="large">
                            确认
                        </Button>
                    </div>
                </Form>
            </Modal>
        )
    }
}

const WrappedModelHouse = Form.create()(ModelHouse);

export default WrappedModelHouse