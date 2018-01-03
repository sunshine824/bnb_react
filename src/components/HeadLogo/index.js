import React, {Component} from 'react'
import logo from '../../static/images/logo.png'

import './style.less'

class HeadLogo extends Component {
    render() {
        return (
            <div className="bnb-logo">
                <a href="javascript:;">
                    <img src={logo}/>
                </a>
            </div>
        )
    }
}

export default HeadLogo