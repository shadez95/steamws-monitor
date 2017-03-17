import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'

// CBA workshop ID: 450814997

export default class AddPage extends Component {
  constructor(props) {
    super(props)
    this.state = {workshopInput: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  handleInput(e) {
    this.setState({workshopInput: e.target.value})
  }
  handleSubmit() {
    console.log(this.state.workshopInput)
  }
  render() {
    return (
      <div id="AddPage">
        <br />

          <FormGroup row className="container">
            <Label for="workshopID">Steam Workshop ID:</Label>
            <Col>
              <Input type="text" name="workshopIDitem" onChange={this.handleInput} id="workshopID" placeholder="123456789" />
            </Col>
          </FormGroup>
          <Button color="success" type="submit" onClick={this.handleSubmit} value="Submit">Add</Button>

      </div>
    )
  }
}
