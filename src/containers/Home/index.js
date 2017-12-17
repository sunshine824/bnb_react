import React, {Component} from 'react'
import HomeLeft from './HomeLeft'
import HomeRight from './HomeRight'
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

    render() {
        return (
            <div className="home-content">
                <HomeLeft/>
                <HomeRight/>
                <PopupsRight/>
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

export default connect(mapStateToProps, mapActionsToProps)(Home)