import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import Main from "./components/main";
import Settings from "./components/settings";
import AddGame from "./components/addGame";

const ele = (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="settings" component={Settings} />
    <Route path="add-game" component={AddGame} />
  </Route>
);

export default ele;
