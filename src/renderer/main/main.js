import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  const Example = require('./components/main')
  ReactDOM.render(<AppContainer><Example/></AppContainer>, document.getElementById('app'));
}

render();
if (module.hot) { module.hot.accept(render); }