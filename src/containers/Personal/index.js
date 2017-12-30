import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'
import LeftMenu from './LeftMenu'
import {
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

import './style.less'

const PersonalInfo = asyncComponent(() => import('@/containers/Personal/PersonalInfo'))
const ChannelSet = asyncComponent(() => import('@/containers/Personal/ChannelSet'))

class personal extends Component {

    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    render() {
        return (
            <div className='personal-main'>
                <LeftMenu/>
                <div className='personal-right'>
                    <Route path='/personal-info' exact component={PersonalInfo}/>
                    <Route path='/channel-set' exact component={ChannelSet}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        states: state
    }
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators({
            save_path
        }, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(personal))