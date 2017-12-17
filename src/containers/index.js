import React, {Component} from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

const Header=asyncComponent(()=>import('@/containers/Header'))
const Home=asyncComponent(()=>import('@/containers/Home'))
const RoomManage=asyncComponent(()=>import('@/containers/RoomManage'))

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
                    </Switch>
                </div>
            </div>
        )
    }
}
