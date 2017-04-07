// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.production') // eslint-disable-line global-require
// } else {
//   module.exports = require('./configureStore.development') // eslint-disable-line global-require
// }

import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

// const middleware = 

export default createStore(reducer, applyMiddleware(promise(), thunk, createLogger()));