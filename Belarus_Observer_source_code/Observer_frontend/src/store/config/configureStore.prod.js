import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {apiMiddleware} from 'redux-api-middleware'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

import rootReducer from '../'

const history = createHistory()


const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk,
    apiMiddleware,
    routerMiddleware(history)
  )
)

export default configureStore
