import {createStore} from 'redux'
import reducers from '../reducers'

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}