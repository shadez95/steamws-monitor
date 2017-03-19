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
    const remote = require('electron').remote
    let list = remote.getCurrentWindow().mainLib.workshopStore.get('list')
    console.log("list: ", JSON.stringify(list))
    this.state = {listAll: JSON.stringify(list)}
  }
  getList() {
    const remote = require('electron').remote
    let list = remote.getCurrentWindow().mainLib.workshopStore.get('list')
    console.log("list: ", JSON.stringify(list))
    this.setState({listAll: JSON.stringify(list)})
    // for (let app in list) {
    //   console.log(app)
    // }
  }
  render() {
    return(
      <div>{this.state.listAll}</div>
    )
  }
}
