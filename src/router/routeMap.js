import React, {Component} from 'react'
import {
    BrowserRouter,
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

const PrimaryLayout=asyncComponent(()=>import('@/containers'))
//const Test=asyncComponent(()=>import('@/containers/Test'))

class RouteMap extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*<Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/test" component={Test}/>
                </Switch>*/}
                <PrimaryLayout/>
            </BrowserRouter>
        )
    }
}

export default RouteMap