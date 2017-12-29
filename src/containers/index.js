import React, {Component} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

const Header=asyncComponent(()=>import('@/containers/Header'))
const Home=asyncComponent(()=>import('@/containers/Home'))
const RoomManage=asyncComponent(()=>import('@/containers/RoomManage'))
const OrderManage=asyncComponent(()=>import('@/containers/OrderManage'))
const Income=asyncComponent(()=>import('@/containers/Income'))

export default class PrimaryLayout extends Component {
    render(){
        return(
            <div>
                <Header/>
                <div className="main">
                    <Route path="/" exact component={Home}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/room-manage" exact component={RoomManage}/>
                    <Route path="/order-manage" exact component={OrderManage}/>
                    <Route path="/income" exact component={Income}/>
                </div>
            </div>
        )
    }
}
