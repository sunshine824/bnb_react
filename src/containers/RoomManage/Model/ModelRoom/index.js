import React, {Component} from 'react'
import {Modal, Form, Input, Icon, Button, Select, message} from 'antd';
import {getHouseListData} from '@/fetch/HouseList'
import {editRoom} from '@/fetch/RoomList'

import './style.less'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

let uuid = 0;

class ModelRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            houseList: ''
        }
    }

    componentDidMount() {
        this._getHouseList()
    }

    handleCancel = (e) => {
        this.props.onChangeRoom(false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let arr = []
                for (let k in values.channels) {
                    arr.push(values.channels[k])
                }
                values.id = this.props.id
                values.channels = arr
                values.name = this.props.roomInfo.data.name
                this._editRoom(values)
            }
        });
    }

    _editRoom(data) {
        const result = editRoom(data)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                message.success('修改成功！')
                this.props.onChangeRoom(false)
                this.props._getRoomList()
                this.props._getHouseList()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    remove(k, index) {
        const {form} = this.props
        const keys = form.getFieldValue('keys')
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        this.props.deteleRoomInfo(index)
    }

    add() {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        uuid = keys[keys.length - 1] ? keys[keys.length - 1] + 1 : 1
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    //获取所有房型
    _getHouseList() {
        const result = getHouseListData()
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.setState({
                    houseList: json
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const {houseList} = this.state
        const {roomEditVisible, roomInfo} = this.props
        const {getFieldDecorator, getFieldValue} = this.props.form;
        let arr = []
        let channels = roomInfo ? roomInfo.data.channels : ''
        for (let i = 0; i < channels.length; i++) {
            arr.push(i)
        }

        getFieldDecorator('keys', {initialValue: arr});
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    <div className="room-item">
                        {getFieldDecorator(`channels[${k}]`, {
                            initialValue: channels[index] ? channels[index].channel : '',
                            rules: [{
                                required: true,
                                message: '请输入渠道'
                            }]
                        })(
                            <Input size="large" placeholder="渠道"/>
                        )}
                        <p className="icon">
                            <Icon
                                className="delete"
                                type="minus-circle"
                                onClick={this.remove.bind(this, k, index)}
                            />
                        </p>
                    </div>
                </FormItem>
            )

        })

        return (
            <Modal
                title="编辑房间"
                visible={roomEditVisible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="item">
                        <p className="item-title">
                            房间号
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('num', {
                                    initialValue: roomInfo.data ? roomInfo.data.num : '',
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
                            所属房型
                        </p>
                        <div className="check-input">
                            <FormItem>
                                {getFieldDecorator('type_id', {
                                    initialValue: [roomInfo.data ? roomInfo.data.type_id : ''],
                                    rules: [{
                                        required: true,
                                        message: '请输入所属房型'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        style={{width: '100%'}}
                                        size="large"
                                        placeholder="选择渠道来源"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            houseList ?
                                                !houseList.status ?
                                                    houseList.data.map((item, index) => {
                                                        return (
                                                            <Option key={index} value={item.id}>
                                                                {item.abbre}
                                                            </Option>
                                                        )
                                                    })
                                                    : ''
                                                : ''
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="item">
                        <p className="item-title">
                            房间详细地址
                        </p>
                        <FormItem>
                            {getFieldDecorator('address', {
                                initialValue: roomInfo.data ? roomInfo.data.address : '',
                                rules: [{
                                    required: true,
                                    message: '请填写房间详细地址'
                                }]
                            })(
                                <TextArea placeholder="请填写备注信息" rows={4}/>
                            )}
                        </FormItem>
                    </div>
                    <div className="rooms">
                        {formItems}
                        <Button icon='plus' size="large" className='add-btn' onClick={this.add.bind(this)}>添加渠道</Button>
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

const WrappedModelRoom = Form.create()(ModelRoom);

export default WrappedModelRoom