import React, {Component} from 'react'
import {connect} from 'react-redux'
import HeadLogo from '@/components/HeadLogo'
import HeadNav from '@/components/HeadNav'
import PersonalCenter from '@/components/PersonalCenter'

import './style.less'

class Header extends Component {
    render() {
        return (
            <header className="header">
                <HeadLogo/>
                <HeadNav {...this.props.state}/>
                <PersonalCenter/>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Header)