import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { Router, hashHistory } from "react-router";
// import { syncHistoryWithStore } from "react-router-redux";

// import routes from "./routes";

// import App from './containers/App'
// import Main from './components/main'

import store from "../store/configureStore.js";

// console.log('[main.js] store: ', store);

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(hashHistory, store);

const remote = require("electron").remote;
var appRoot = remote.require("app-root-path");

window.createNotification = (bodyInput) => {
  new Notification("Steam Workshop Monitor", {
    body: bodyInput,
    icon: `file://${appRoot}/src/static/images/logos/favicon-96x96.png`
  });
};

var isWin = /^win/.test(process.platform);
var isLinux = /^linux/.test(process.platform);

if (isWin) {
  window.platform = "win";
} else if (isLinux) {
  window.platform = "linux";
} else {
  window.platform = "notCompat";
}

if ( process.env.NODE_ENV !== "development") {
  const Main = require("./containers/main");
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>, document.getElementById("app")
  );
} else {
  const render = () => {
    // NB: We have to re-require MyApp every time or else this won't work
    // We also need to wrap our app in the AppContainer class
    const Main = require("./containers/main");
    const AppContainer = require("react-hot-loader");
    const ele = (
      <AppContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </AppContainer>
    );
    
    ReactDOM.render(
      ele, document.getElementById("app")
    );
  };
  
  render();
  if (module.hot) { module.hot.accept(render); }
}