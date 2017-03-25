import React, { Component } from 'react'
import { FormGroup, Label, Col, Input, Button } from 'reactstrap'
import classnames from 'classnames'

import Add from './add'
import GameList from './game-list'
import PlusMinus from './plus-minus'

// {
// 	"list": [
// 		{
// 			"appID": "107410",
// 			"name": "Arma 3",
// 			"workshopItems": [
//         {
//           "publishedfileid":"450814997",
//           "title": "CBA_A3",
//           "file_size": 1723806,
//           "preview_url":"http://images.akamai.steamusercontent.com/ugc/96103700535480868/060D6AFCEF7F2740FDA8737A86B439F4383721F2/",
//           "time_created":1432827434,
//           "time_updated":1488215378,
//         }
//       ]
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

class AddWorkshopItem extends Component {
  constructor(props) {
    super(props)
    this.isNumber = this.isNumber.bind(this)
    this.handleInputWSID = this.handleInputWSID.bind(this)
    this.state = {workshopInput: ''}
  }
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault()
    }
  }
  handleInputWSID(e) {
    this.setState({workshopInput: e.target.value})
  }
  handleSubmit(e) {

  }
  render() {
    return(
      <div>
        <FormGroup row className="container">
          <Label for="workshopID">Steam Workshop ID:</Label>
          <Col>
            <Input type="text" name="workshopIDitem" onChange={this.handleInputWSID}
              value={this.state.workshopInput}
              id="workshopID" onKeyPress={this.isNumber}
              placeholder="Steam Workshop ID" title="Enter numbers only."/>
          </Col>
        </FormGroup>
        <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Add</Button>
      </div>
    )
  }
}

class WorkshopItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {workshopItems: this.props.workshopItems}
  }
  render() {
    return(
      <div>
        {this.state.workshopItems}
      </div>
    )
  }
}

class GameData extends Component {
  constructor(props) {
    super(props)
    this.onBtnClick = this.onBtnClick.bind(this)
    this.getWorkshopItems = this.getWorkshopItems.bind(this)
    this.state = {plus_minus: 'fa fa-plus', slider: 'slider closed', workshopItems: []}
  }
  onBtnClick(e) {
    if (this.state.plus_minus === 'fa fa-minus') {
      this.setState({slider: 'slider closed', plus_minus: 'fa fa-plus'})
    } else {
      this.setState({slider: 'slider', plus_minus: 'fa fa-minus'})
    }
  }
  getWorkshopItems() {
    const remote = require('electron').remote
    const workshopStore = remote.getCurrentWindow().mainLib.workshopStore
  }
  render() {
    return(
      <div>
        <Button onClick={this.onBtnClick} color="secondary"style={{ marginBottom: '1rem' }}>
          {this.props.GameName} &nbsp;<PlusMinus sign={this.state.plus_minus} />
        </Button>
        <div className={this.state.slider}>
          <AddWorkshopItem />
          {this.state.workshopItems}
          <hr />
        </div>
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
        <Add list={this.state.mainList} update={this.updateList} />
        <br />
        <GameList arrayComponents={this.state.listArrayComponents} />
      </div>
    )
  }
}
