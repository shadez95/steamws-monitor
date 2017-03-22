import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

export default class GameList extends Component {
  constructor(props) {
    super(props)
    console.log("[list.jsx] constructor - props.arrayComponents: ", this.props.arrayComponents)
  }
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
