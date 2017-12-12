import React, {Component} from 'react'
import Header from '../Header'
import HomeLeft from './HomeLeft'
import HomeRight from './HomeRight'

import './style.less'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="home-content">
                    <HomeLeft/>
                    <HomeRight/>
                </div>
            </div>
        )
    }
}