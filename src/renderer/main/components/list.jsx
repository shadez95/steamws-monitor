import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

export default class List extends Component {
  // constructor(props) {
  //   super(props)
  //   this.addedGame = this.addedGame.bind(this)
  //   this.getList = this.getList.bind(this)
  //   const remote = require('electron').remote
  //   let list = this.getList()
  //   console.log("constructor - list: ", list)
  //
  //   let arrayComponents = []
  //   for (let i = 0; i < list.length; i++) {
  //     console.log("[list.jsx] constructor - i: ", i)
  //     console.log("[list.jsx] constructor - adding game: ", list[i].name)
  //     let name = list[i].name
  //     arrayComponents.push(<GameData key={i} GameName={name} />)
  //   }
  //   console.log("[list.jsx] constructor - arrayComponents: ", arrayComponents)
  //   this.state = {listKeys: Object.keys(list), listArrayComponents: arrayComponents}
  // }
  // componentWillUpdate() {
  //   let list = this.getList()
  //   console.log("[list.jsx] componentWillUpdate - list: ", list)
  //   let name = list[list.length-1].name
  //   console.log("[list.jsx] componentWillUpdate - name: ", name)
  //   console.log("[list.jsx] componentWillUpdate - list[list.length-1]: ", list[list.length-1])
  //   let key = list[list.length-1]
  //   console.log("[list.jsx] componentWillUpdate - key: ", key)
  //   this.addedGame(name, key)
  // }
  // addedGame(name, i) {
  //   let listArrayComponents = this.state.listArrayComponents
  //   console.log("[list.jsx] addGame - listArrayComponents: ", listArrayComponents)
  //   let newArray = listArrayComponents.push(
  //     <GameData key={i} GameName={name} />
  //   )
  //   this.setState({listArrayComponents: newArray})
  // }
  // getList() {
  //   const remote = require('electron').remote
  //   let list = remote.getCurrentWindow().mainLib.workshopStore.get('list')
  //   console.log("[list.jsx] getList - list: ", list)
  //   // this.setState({listArray: JSON.stringify(list)})
  //   // for (let app in list) {
  //   //   console.log(app)
  //   // }
  //   return list
  // }
  render() {
    return(
      <div>
        {this.props.arrayComponents}
        <br />
      </div>
    )
  }
}
