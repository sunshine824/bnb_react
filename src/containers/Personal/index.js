import React, {Component} from 'react'
//import {save_path} from '@/redux/actions'
import LeftMenu from './LeftMenu'
import {
    //Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

import './style.less'

/*const PersonalInfo = asyncComponent(() => import('@/containers/Personal/PersonalInfo'))
const ChannelSet = asyncComponent(() => import('@/containers/Personal/ChannelSet'))
const ColorRemark = asyncComponent(() => import('@/containers/Personal/ColorRemark'))
const RePassword = asyncComponent(() => import('@/containers/Personal/RePassword'))*/

import PersonalInfo from '@/containers/Personal/PersonalInfo'
import ChannelSet from '@/containers/Personal/ChannelSet'
import ColorRemark from '@/containers/Personal/ColorRemark'
import RePassword from '@/containers/Personal/RePassword'

class personal extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className='personal-main'>
                <LeftMenu/>
                <div className='personal-right'>
                    <Route path='/personal-info' exact component={PersonalInfo}/>
                    <Route path='/channel-set' exact component={ChannelSet}/>
                    <Route path='/color-remark' exact component={ColorRemark}/>
                    <Route path='/re-password' exact component={RePassword}/>
                </div>
            </div>
        )
    }
}


export default personal