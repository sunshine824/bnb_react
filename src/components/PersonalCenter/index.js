import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import user from '../../static/images/user.svg'

import './style.less'

class Personal extends Component {
    render() {

        const personallink = {
            background:`url("${user}") no-repeat center center`,
            backgroundSize:'20px',
            paddingLeft:'75px',
            display:'inline-block'
        }

        return (
            <div className='personal'>
                <Link to='/personal-info' style={personallink}>个人中心</Link>
            </div>
        )
    }
}

export default Personal