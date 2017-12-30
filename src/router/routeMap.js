import React, {Component} from 'react'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import {asyncComponent} from '@/config/fnMixin'

const PrimaryLayout = asyncComponent(() => import('@/containers'))
const SignUp = asyncComponent(() => import('@/containers/SignUp'))
const SignIn = asyncComponent(() => import('@/containers/SignIn'))
//const Test=asyncComponent(()=>import('@/containers/Test'))

class RouteMap extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/signin" component={SignIn}/>
                    <PrimaryLayout/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouteMap