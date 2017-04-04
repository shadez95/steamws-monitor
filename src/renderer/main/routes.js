import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Main from './components/main';
import Settings from "./components/settings";

window.DynamicRoutes = [];

const ele = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    {window.dynamicRoutes}
  </Route>
);

export default ele;
