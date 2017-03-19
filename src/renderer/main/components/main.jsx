import React, { Component } from 'react'
import { FormGroup, Label, Col, Input, Button } from 'reactstrap'
import classnames from 'classnames'

import Add from './add'
import List from './list'

// {
// 	"list": [
// 		{
// 			"appID": "107410",
// 			"name": "Arma 3",
// 			"workshopIDs": []
// 		},
// 		{
// 			"appID": "244850",
// 			"name": "Space Engineers",
// 			"workshopIDs": []
// 		},
// 		{
// 			"appID": "108600",
// 			"name": "Project Zomboid",
// 			"workshopIDs": []
// 		}
// 	]
// }

// import Monitor from './monitor'

// <FormGroup row className="container">
//   <Label for="localLocationID">Local Install Location:</Label>
//   <Col>
//     <Input type="text" name="localLocation" id="localLocationID" placeholder="C:\location\to\workshop\file\folder" />
//   </Col>
// </FormGroup>

class GameData extends Component {
  render(){
    return(
      <div>
        <Button color="secondary"style={{ marginBottom: '1rem' }}>{this.props.GameName}</Button>
      </div>
    )
  }
}

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.updateList = this.updateList.bind(this)
    this.getList = this.getList.bind(this)
    this.addGameDataComponents = this.addGameDataComponents.bind(this)
    this.updateGameDataComponent = this.updateGameDataComponent.bind(this)
    var list = this.getList()
    console.log("[main.jsx] constructor - list: ", list)
    var arrayComponents = this.addGameDataComponents(list)
    console.log("[main.jsx] constructor - arrayComponents: ", arrayComponents)
    this.state = {
      listKeys: Object.keys(list),
      listArrayComponents: arrayComponents,
      mainList: list
    }
  }
  addGameDataComponents(list) {
    let arrayComponents = []
    for (let i = 0; i < list.length; i++) {
      // Create GameData components for each game added
      console.log("[main.jsx] constructor - i: ", i)
      console.log("[main.jsx] constructor - adding game: ", list[i].name)
      let name = list[i].name
      arrayComponents.push(<GameData key={i} GameName={name} />)
    }
    return arrayComponents
  }
  updateGameDataComponent(list) {
    console.log("[main.jsx] updateGameDataComponent - list[list.length-1]: ", list[list.length-1])
    let name = list[list.length-1].name
    let key = list.length-1
    let arrayComponents = this.state.listArrayComponents
    console.log("[main.jsx] updateGameDataComponent - key: ", key)
    arrayComponents.push(<GameData key={key} GameName={name} />)
    this.setState({listArrayComponents: arrayComponents})
  }
  getList() {
    const remote = require('electron').remote
    let list = remote.getCurrentWindow().mainLib.workshopStore.get('list')
    console.log("[main.jsx] getList - list: ", list)
    return list
  }
  updateList() {
    let list = this.getList()
    console.log("[main.jsx] updateList - list: ", list)
    this.setState({mainList: list, listKeys: Object.keys(list)})
    this.updateGameDataComponent(list)
  }
  render() {
    return (
      <div className="container">
        <br />
        <h1 style={{"textAlign": "center"}}>Steam Workshop Monitor</h1>
        <br />
        <Add arrayComponents={this.state.listArrayComponents}
          list={this.state.mainList} update={this.updateList} />
        <br />
        <List arrayComponents={this.state.listArrayComponents} />
      </div>
    )
  }
}
