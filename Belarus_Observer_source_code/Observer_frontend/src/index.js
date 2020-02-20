import React                     from 'react'
import { Provider }              from 'react-redux'
import { render }                from 'react-dom'
import * as serviceWorker        from './serviceWorker'
import { Router } from 'react-router-dom'
import { createBrowserHistory }  from 'history'
import ReduxIntlProvider         from './reduxIntlProvider'

import configureStore from './store/config/configureStore'
import BaseContainer  from './constructors/public/BaseContainer'
import { initLocale } from './utils/locale/LocaleUtil'

import 'bootstrap/dist/css/bootstrap.css'
import 'react-table/react-table.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles/supportStyles.scss'
import './styles/index.scss'
import './styles/table.scss'


const store = configureStore()
const history = createBrowserHistory()

initLocale()

render(
  <Provider store={store}>
    <ReduxIntlProvider>
      <Router history={history}>
        <BaseContainer/>
      </Router>
    </ReduxIntlProvider>
  </Provider>,
  document.getElementById('root'),
)
serviceWorker.unregister()
