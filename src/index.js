import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from '../src/reducers/index'
import middleware from './middlewares'

const store = createStore(rootReducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)