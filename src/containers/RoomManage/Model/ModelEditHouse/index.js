import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Modal, Form, Input, Icon, Button, message} from 'antd';
import {editHouse, deteleRoom} from '@/fetch/HouseList'

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
                this._editHouse(values)
            }
        });
    }

    /**
     * 编辑房型
     * @param values
     * @private
     */
    _editHouse(values) {
        const obj = {}
        const houses = []
        for (let key in values.houses) {
            for (let k in values.houses[key]) {
                const obj1 = {id: k, num: values.houses[key][k]}
                houses.push(obj1)
            }
        }
        for (let key in values) {
            obj.abbre = values.abbre
            obj.name = values.name
            obj.id = this.props.id
            obj.houses = JSON.stringify(houses)
        }
        const result = editHouse(obj)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (!json.status) {
                this.props.onChangeHouse(false)
                this.props._getHouseList()
                this.props._getRoomList()
                message.success('修改成功！');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    remove(k, index, id) {
        const {form} = this.props
        const keys = form.getFieldValue('keys')
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        this._deteleRoom(id,index)
    }

    /**
     * 删除房间
     * @param id
     * @private
     */
    _deteleRoom(id,index) {
        const result = deteleRoom(id)
        result.then(res => {
            return res.json()
        }).then(json => {
            if(!json.status){
                this.props.deleteHouseInfo(index)
            }
        }).catch(err => {
            console.log(err)
        })
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

    render() {
        const {houseEditVisible, houseInfo} = this.props
        const {getFieldDecorator, getFieldValue} = this.props.form;
        let arr = []
        let houses = houseInfo ? houseInfo.data.houses : ''
        for (let i = 0; i < houses.length; i++) {
            arr.push(i)
        }

        getFieldDecorator('keys', {initialValue: arr});
        let keys = getFieldValue('keys');

        const decorator = (k, index) => {
            return `houses[${k}].${houseInfo.data.houses[index] ? houseInfo.data.houses[index].id : 0}`
        }

        const formItems = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    <div className="room-item">
                        {getFieldDecorator(decorator(k, index), {
                            initialValue:
                                houseInfo.data.houses[index] ?
                                    houseInfo.data.houses[index].num
                                    : '',
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
                                onClick={this.remove.bind(this, k, index,
                                    houseInfo ?
                                        houseInfo.data.houses[index] ?
                                            houseInfo.data.houses[index].id
                                            : 0
                                        : '')}
                            />
                        </p>
                    </div>
                </FormItem>
            )

        })

        return (
            <Modal
                title='编辑房型'
                visible={houseEditVisible}
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
                                    initialValue: houseInfo.data ? houseInfo.data.name : '',
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
                                    initialValue: houseInfo.data ? houseInfo.data.abbre : '',
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