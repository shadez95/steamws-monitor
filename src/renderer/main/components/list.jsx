import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

// {
//   list: [
//     "107410": {
//       appInfo: [],
//       workshopItems: []
//     }
//     "244850": {
//       appInfo: [],
//       workshopItems: []
//     }
//   ]
// }

export default class List extends Component {
  constructor(props) {
    super(props)
    this.getList = this.getList.bind(this)
  }
  componentWillUpdate() {
    getList()
  }
  getList() {
    const remote = require('electron').remote
    const workshopStore = remote.getGlobal('lib').steamwsStore

    let listArray = workshopStore.get('list')
    for (app in listArray) {
      console.log(app)
    }
  }
  render() {
    return(
      <div></div>
    )
  }
}
