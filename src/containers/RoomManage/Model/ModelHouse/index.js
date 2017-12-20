import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Modal, Form, Input, Icon, Button} from 'antd';
import {addHouse, editHouse} from '@/fetch/HouseList'

import './style.less'

const FormItem = Form.Item;

let uuid = 0;

class ModelHouse extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
    }

    handleCancel = (e) => {
        this.props.onChangeHouse(false)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.mold === 'add') {
                    this._addHouse(values)
                } else {
                    this._editHouse(values)
                }
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
            }
        }).catch(err => {
            console.log(err)
        })
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
        const {form, mold} = this.props;
        const keys = form.getFieldValue('keys');
        uuid = mold === 'edit' ? keys[keys.length - 1] + 1 : 0
        const nextKeys = keys.concat(uuid);
        uuid++;
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        const {houseVisible, mold, houseInfo} = this.props
        const {getFieldDecorator, getFieldValue} = this.props.form;
        let arr = []

        if (this.props.mold === 'edit') {
            arr = []
            let houses = houseInfo ? houseInfo.data.houses : ''
            for (let i = 0; i < houses.length; i++) {
                arr.push(i)
            }
        }

        getFieldDecorator('keys', {initialValue: arr});
        let keys = getFieldValue('keys');

        const decorator = (index) => {
            if(mold==='edit'){
                return `houses[${index}].${houseInfo.data.houses[index] ? houseInfo.data.houses[index].id : 0}`
            }else {
                return `houses[${index}]`
            }
        }

        const formItems = keys.map((k, index) => {
            return (
                <FormItem key={k}>
                    <div className="room-item">
                        {getFieldDecorator(decorator(index), {
                            initialValue: mold === 'edit' ? houseInfo.data.houses[index] ? houseInfo.data.houses[index].num : '' : '',
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
                title={mold === 'add' ? '添加房型' : '编辑房型'}
                visible={houseVisible}
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
                                    initialValue: mold === 'edit' ? houseInfo.data ? houseInfo.data.name : '' : '',
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
                                    initialValue: mold === 'edit' ? houseInfo.data ? houseInfo.data.abbre : '' : '',
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