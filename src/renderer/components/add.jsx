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
    evt.persist()
    evt = (evt) ? evt : window.event
    console.log(evt)
    var charCode = (evt.which) ? evt.which : evt.keyCode
    console.log(charCode)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("returning false")
      var nonNumericRegex = /[^a-z]+g/
      evt.target.value.replace(nonNumericRegex, "")
      return false
    }
    console.log("returning true")
    return true
  }

  handleInputAppIDItem(e) {
    console.log(e.target.value)
    console.log("isNan", e.target.value.isNan)
    this.setState({appInput: e.target.value})
  }
  handleInputWSID(e) {
    console.log(e.target.value)
    console.log("isNan", e.target.value.isNan)
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
               id="appID" onKeyPress={this.isNumber} placeholder="123456" title="Enter numbers only."/>
            </Col>
          </FormGroup>
          <FormGroup row className="container">
            <Label for="workshopID">Steam Workshop ID:</Label>
            <Col>
              <Input type="text" name="workshopIDitem" onChange={this.handleInputWSID}
               id="workshopID" onKeyPress={this.isNumber} placeholder="123456789" title="Enter numbers only."/>
            </Col>
          </FormGroup>
          <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Add</Button>

      </div>
    )
  }
}
