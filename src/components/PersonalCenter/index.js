import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import user from '../../static/images/user.svg'
import {Layout} from '@/fetch/SignIn'

import './style.less'

class Personal extends Component {

    _Layout() {
        const result = Layout()
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.status === 0) {
                window.location.href = '/signIn'
                localStorage.removeItem('token')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        const personallink = {
            background: `url("${user}") no-repeat center center`,
            backgroundSize: '20px',
            paddingLeft: '75px',
            display: 'inline-block'
        }

        return (
            <div className='personal'>
                <Link to='/personal-info' style={personallink}>个人中心</Link>
                <Button type='danger' style={{marginLeft: '15px'}} onClick={this._Layout.bind(this)}>退出</Button>
            </div>
        )
    }
}

export default Personal