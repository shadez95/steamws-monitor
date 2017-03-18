import React, { Component } from 'react'
import { FormGroup, Label, Col, Input, Button } from 'reactstrap'

export default class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {appInput: ''}
    this.handleInputAppIDItem = this.handleInputAppIDItem.bind(this)
  }
  handleInputAppIDItem(e) {
    this.setState({appInput: e.target.value})
  }
  handleSaveAppID(e) {
    const remote = require('electron').remote
    const workshopStore = remote.getGlobal('lib').steamwsStore
    if (workshopStore.get(this.state.appInput) === undefined) {
      // workshopStore.set('apps', this.state.appInput)
      workshopStore.set(this.state.appInput, )
    } else {
      let arr = workshopStore.get(this.state.appInput).push(this.state.workshopInput)
      workshopStore.set(this.state.appInput, arr)
    }
  }
  render() {
    return (
      <div className={this.props.slider}>
        <FormGroup row className="container">
          <Label for="appID">App ID:</Label>
          <Col>
            <Input type="text" name="appIDItem" onChange={this.handleInputAppIDItem}
             id="appID" onKeyPress={this.isNumber} placeholder="Steam App ID" title="Enter numbers only."/>
          </Col>
        </FormGroup>
        <Button color="success" onClick={this.handleSaveAppID}>Save</Button>
        <hr />
      </div>
    )
  }
}
