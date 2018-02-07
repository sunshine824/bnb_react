import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import configureStore from './redux/store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill'

import './static/css/base.css'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();