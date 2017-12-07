import React, {Component} from 'react'
import {
    Router,
    Route
} from 'dva/router'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from '../containers/Home'

const history = createBrowserHistory()

class RouteMap extends Component {
    render(){
        return(
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Home}/>
                </div>
            </Router>
        )
    }
}

export default RouteMap