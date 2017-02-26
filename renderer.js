// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MainPage from './components/main/index.js'

require("!style!css!bootstrap/dist/css/bootstrap.css")
require('./static/styles.css')

class App extends Component {
  render () {
    return (
      <div className="container">
        <MainPage />
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
