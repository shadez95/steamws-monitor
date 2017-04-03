import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, browserHistory } from 'react-router-redux'


import routes from './routes'

// import App from './containers/App'
// import Main from './components/main'

import store from '../../store/configureStore.js'
// console.log('[main.js] configureStore: ', configureStore)
// const store = configureStore()
console.log('[main.js] store: ', store)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

// console.log('[main.js] routes: ', routes)

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const ele = (
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>
  )
  console.log("[main.js] ele: ", ele)
  ReactDOM.render(
    ele, document.getElementById('app')
  )
}

render()
if (module.hot) { module.hot.accept(render) }