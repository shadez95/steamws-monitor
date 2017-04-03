import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Main from './components/main'

const ele = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
  </Route>
)
console.log("[routes.js] App: ", App)
console.log("[routes.js] Main: ", Main)
console.log("[routes.js] ele: ", ele)
export default ele