import { createStore, applyMiddleware } from 'redux'
import thunk                                     from 'redux-thunk'
import { apiMiddleware }                         from 'redux-api-middleware'
import { createLogger }                          from 'redux-logger'
import createHistory                             from 'history/createBrowserHistory'
import { routerMiddleware }                      from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducers            from '../'

const history = createHistory()

const configureStore = preloadedState => {

  const store = createStore(
    rootReducers,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        apiMiddleware,
        createLogger(),
        routerMiddleware(history),
      ),
    ),
  )

  if (module.hot) {
    module.hot.accept('../', () => {
      const nextRootReducer = require('../')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
