import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

import AddGame from './addGame'
// CBA workshop ID: 450814997

class PlusMinus extends Component {
  render() {
    return (
      <i className={this.props.sign} aria-hidden="true"></i>
    )
  }
}

export default class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workshopInput: '',
      slider: 'slider closed',
      addGameBtnTxt: 'fa fa-plus'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputWSID = this.handleInputWSID.bind(this)
    this.isNumber = this.isNumber.bind(this)

    this.addGameSliderHandler = this.addGameSliderHandler.bind(this)
  }
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault()
    }
  }
  addGameSliderHandler(e) {
    if (this.state.slider === 'slider') {
      this.setState({slider: 'slider closed', addGameBtnTxt: 'fa fa-plus'})
    } else {
      this.setState({slider: 'slider', addGameBtnTxt: 'fa fa-minus'})
    }
  }
  handleInputWSID(e) {
    this.setState({workshopInput: e.target.value})
  }
  handleSubmit() {
    // console.log(this.state.workshopInput)
    const remote = require('electron').remote
    const workshopStore = remote.getGlobal('lib').steamwsStore
    if (workshopStore.get(this.state.appInput) === undefined) {
      workshopStore.set(this.state.appInput, [this.state.workshopInput])
    } else {
      let arr = workshopStore.get(this.state.appInput).push(this.state.workshopInput)
      workshopStore.set(this.state.appInput, arr)
    }
  }
  render() {
    return (
      <div id="AddContent">
        <FormGroup row className="container">
          <Button color="primary" type="submit"
            onClick={this.addGameSliderHandler}>Add Steam Game &nbsp;<PlusMinus sign={this.state.addGameBtnTxt} /></Button>
        </FormGroup>
        <AddGame slider={this.state.slider}/>
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
