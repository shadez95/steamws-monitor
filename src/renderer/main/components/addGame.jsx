import React, { Component } from 'react'
import { FormGroup, Label, Col, Input, Button } from 'reactstrap'

export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {appInput: ''}
    this.handleInputAppIDItem = this.handleInputAppIDItem.bind(this)
    this.clearInputAppID = this.clearInputAppID.bind(this)
    this.handleSaveAppID = this.handleSaveAppID.bind(this)
    this.isNumber = this.isNumber.bind(this)
  }
  handleInputAppIDItem(e) {
    this.setState({appInput: e.target.value})
  }
  clearInputAppID(e) {
    this.setState({appInput: ''})
  }
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault()
    }
  }
  handleSaveAppID(e) {
    const remote = require('electron').remote
    const workshopStore = remote.getGlobal('lib').steamwsStore
    console.log("this.state: ", this.state)
    let listArray = workshopStore.get('list')
    if (listArray === undefined) {
      listArray = []
    }
    console.log('listArray: ', listArray)
    listArray.push(this.state.appInput)
    workshopStore.set('list', listArray)
    console.log("workshopStore - list: ", workshopStore.get('list'))
    this.clearInputAppID(e)
  }
  render() {
    return (
      <div className={this.props.slider}>
        <FormGroup row className="container">
          <Label for="appID">App ID:</Label>
          <Col>
            <Input type="text"
              name="appIDItem" onChange={this.handleInputAppIDItem} value={this.state.appInput}
             id="appID" onKeyPress={this.isNumber} placeholder="Steam App ID" title="Enter numbers only."/>
          </Col>
        </FormGroup>
        <Button color="success" onClick={this.handleSaveAppID}>Add</Button>
        <hr />
      </div>
    )
  }
}
