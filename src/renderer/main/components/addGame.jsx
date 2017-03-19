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
    const workshopStore = remote.getCurrentWindow().mainLib.workshopStore
    console.log("[addGame.jsx] this.state: ", this.state)
    let temp_appInput = this.state.appInput
    this.clearInputAppID(e)
    var SteamApi = require('steam-api');
    var app = new SteamApi.App('0691601DDFE7900A2E2DA7D770D55F0F');
    const props = this.props
    var mainList = props.list
    console.log('[addGame.jsx] handleSaveAppID - mainList: ', mainList)
    app.appDetails(temp_appInput).done(function(result){
      mainList.push({appID: temp_appInput, name: result.name, workshopIDs: []})
      console.log('[addGame.jsx] mainList: ', mainList)
      workshopStore.set('list', mainList)
      props.update()
    });
  }
  render() {
    return (
      <div className={this.props.slider}>
        <FormGroup row className="container">
          <Label for="appID">Steam App ID:</Label>
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
