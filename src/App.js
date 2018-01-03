import React, {Component} from 'react';
import RouteMap from './router/routeMap'

import './App.css'


class App extends Component {
    constructor() {
        super();
        this.state = {
            initDone: false
        }
    }

    componentDidMount() {
        this.setState({
            initDone: true
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.initDone
                        ? <RouteMap/>
                        : '正在加载...'
                }
            </div>
        );
    }
}

export default App;
