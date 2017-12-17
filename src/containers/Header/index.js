import React, {Component} from 'react'
import {connect} from 'react-redux'
import HeadLogo from '@/components/HeadLogo'
import HeadNav from '@/components/HeadNav'
//import HeadHandle from '@/components/HeadHandle'

import './style.less'

class Header extends Component {
    render() {
        return (
            <header className="header">
                <HeadLogo/>
                <HeadNav {...this.props.state}/>
                {/*<HeadHandle/>*/}
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