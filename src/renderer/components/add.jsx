import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

// CBA workshop ID: 450814997

export default class AddPage extends Component {
  constructor(props) {
    super(props)
    this.state = {workshopInput: '', appInput: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputAppIDItem = this.handleInputAppIDItem.bind(this)
    this.handleInputWSID = this.handleInputWSID.bind(this)
    this.isNumber = this.isNumber.bind(this)
  }
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault()
    }
  }

  handleInputAppIDItem(e) {
    this.setState({appInput: e.target.value})
  }
  handleInputWSID(e) {
    this.setState({workshopInput: e.target.value})
  }
  handleSubmit() {
    // console.log(this.state.workshopInput)
    const remote = require('electron').remote
    const workshopStore = remote.getGlobal('wsStore').steamwsStore
    if (workshopStore.get(this.state.appInput) === undefined) {
      workshopStore.set(this.state.appInput, [this.state.workshopInput])
    } else {
      let arr = workshopStore.get(this.state.appInput).push(this.state.workshopInput)
      workshopStore.set(this.state.appInput, arr)
    }
  }
  render() {
    return (
      <div id="AddPage">
        <br />

          <FormGroup row className="container">
            <Label for="appID">App ID:</Label>
            <Col>
              <Input type="text" name="appIDItem" onChange={this.handleInputAppIDItem}
               id="appID" onKeyPress={this.isNumber} placeholder="Steam App ID" title="Enter numbers only."/>
            </Col>
          </FormGroup>
          <FormGroup row className="container">
            <Label for="workshopID">Steam Workshop ID:</Label>
            <Col>
              <Input type="text" name="workshopIDitem" onChange={this.handleInputWSID}
               id="workshopID" onKeyPress={this.isNumber} placeholder="Steam Workshop ID" title="Enter numbers only."/>
            </Col>
          </FormGroup>
          <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Add</Button>

      </div>
    )
  }
}
