import React, {Component} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

/*const Header=asyncComponent(()=>import('@/containers/Header'))
const Home=asyncComponent(()=>import('@/containers/Home'))
const RoomManage=asyncComponent(()=>import('@/containers/RoomManage'))
const OrderManage=asyncComponent(()=>import('@/containers/OrderManage'))
//const Income=asyncComponent(()=>import('@/containers/Income'))
const Personal=asyncComponent(()=>import('@/containers/Personal'))*/

import Header from '@/containers/Header'
import Home from '@/containers/Home'
import RoomManage from '@/containers/RoomManage'
import OrderManage from '@/containers/OrderManage'
import Personal from '@/containers/Personal'


export default class PrimaryLayout extends Component {
    render(){
        return(
            <div>
                <Header/>
                <div className="main">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/home" exact component={Home}/>
                        <Route path="/room-manage" exact component={RoomManage}/>
                        <Route path="/order-manage" exact component={OrderManage}/>
                        {/*<Route path="/income" exact component={Income}/>*/}
                        <Route path="/personal-info" exact component={Personal}/>
                        <Route path="/channel-set" exact component={Personal}/>
                        <Route path="/color-remark" exact component={Personal}/>
                        <Route path="/re-password" exact component={Personal}/>
                    </Switch>
                </div>
            </div>
        )
    }
}
