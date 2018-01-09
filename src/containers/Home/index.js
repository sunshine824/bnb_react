import React, {Component} from 'react'
import HomeTop from './HomeTop'
import {withRouter} from 'react-router-dom'
import HomeBottom from './HomeBottom'
import PopupsRight from './PopupsRight'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {save_path} from '@/redux/actions'

import './style.less'

class Home extends Component {
    componentDidMount() {
        const {match, actions} = this.props
        actions.save_path(match.path)
    }

    HandleCalendar(){
        this.refs.home_top.ChildHandleCalendar()
    }

    render() {
        return (
            <div className="home-content">
                <HomeTop ref="home_top"/>
                <HomeBottom />
                <PopupsRight HandleCalendar={this.HandleCalendar.bind(this)}/>
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

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Home))