import React, {Component} from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

const Home=asyncComponent(()=>import('@/containers/Home'))
const Test=asyncComponent(()=>import('@/containers/Test'))

class RouteMap extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/test" component={Test}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouteMap