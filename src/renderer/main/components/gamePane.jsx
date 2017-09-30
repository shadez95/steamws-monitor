import React, { Component } from "react";
// import { connect } from "react-redux";
import WorkshopItem from "../components/workshopItem";
import child_process from "child_process";
import { Input, Row, Col, Button, Table } from "reactstrap";
import log from "electron-log";
import { getConfig, getWorkshopData } from "../../store/configManipulators";

// const mapStateToProps = state => {
//   return { gameData: state.gameData.gameData };
// };

// @connect(mapStateToProps)

export default class GamePane extends Component {
  constructor(props) {
    super(props);
    this.openExternalUrl = this.openExternalUrl.bind(this);
    this.isNumber = this.isNumber.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createWorkshopComponents = this.createWorkshopComponents.bind(this);
    this.deleteWorkshopItem = this.deleteWorkshopItem.bind(this);
    this.downloadWorkshopItem = this.downloadWorkshopItem.bind(this);
    const componentList = this.createWorkshopComponents(this.props.gameData.workshopItems);
    this.state = { input: "", workshopItems: componentList };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      workshopItems: this.createWorkshopComponents(nextProps.gameData.workshopItems)
    });
  }

  createWorkshopComponents(workshopItems) {
    return workshopItems.map((workshopID, idx) => {
      const workshopData = getWorkshopData(workshopID);
      return <WorkshopItem key={idx} deleteWorkshopItem={this.deleteWorkshopItem} data={workshopData} />;
    });
  }

  deleteWorkshopItem(data) {
    const workshopItemIDs = getConfig(`games.${data.appid}.workshopItems`);
    log.debug(workshopItemIDs);

    // Delete the folder containing the workshop data
    const steamCMDLoc = getConfig("settings.steamCMDLoc");
    const idx = steamCMDLoc.indexOf("steamcmd");
    const steamCMDPath = steamCMDLoc.substring(0, idx - 1);
    
    // Check if windows or linux
    let workshopPath;
    let acfFile;
    if (window.platform === "win") {
      workshopPath = `${steamCMDPath}\\steamapps\\workshop\\content\\${data.appid}\\${data.publishedFileID}`;
      acfFile = `${steamCMDPath}\\steamapps\\workshop\\appworkshop_${data.appid}.acf`;
    } else {
      workshopPath = `${steamCMDPath}/steamapps/workshop/content/${data.appid}/${data.publishedFileID}`;
      acfFile = `${steamCMDPath}/steamapps/workshop/appworkshop_${data.appid}.acf`;
    }
    const rimraf = require("rimraf");
    // Make sure we don't accidentally delete some random folder/file if there is undefined in path
    if (workshopPath.indexOf("undefined") === -1) {
      rimraf(workshopPath, () => {
        rimraf(acfFile, () => {
          log.info("Successfully deleted workshop item");
          window.createNotification("Workshop item successfully deleted");
        });
      });
      // const fs = require("fs");
      // fs.unlink(acfFile, err => {
      //   if (err) throw err;
      //   console.log("Successfully deleted acf file");
      // });
    } else {
      log.error("Workshop item was not successfully deleted");
      log.debug(`Path: ${workshopPath}`);
      window.createNotification("Workshop item was not successfully deleted. Navigate to the folder and manually delete.");
    }
    this.props.gameActions.deleteWorkshopItem(data.publishedFileID);
  }

  downloadWorkshopItem(appID, workshopItemID) {
    log.info("Downloading workshop item ID:", workshopItemID);
    const steamCMDLoc = getConfig("settings.steamCMDLoc");

    const process = child_process.spawn(steamCMDLoc, ["+login", getConfig("settings.steamUsername"), getConfig("settings.steamPassword"), "+workshop_download_item", appID, workshopItemID, "validate", "+quit"]);
    window.createNotification("Downloading workshop item...");
    process.stdout.on("data", (data) => {
      log.debug(data.toString());
    });

    process.stderr.on("data", (data) => {
      log.debug(data.toString());
    });

    process.on("close", (code) => {
      if (code === 0) {
        window.createNotification("Workshop item downloaded");
        log.info("Done");
      } else {
        window.createNotification("Something went wrong downloading the workshop item");
        log.error("Something went wrong");      
      }
    });
  }

  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    }
  }

  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit() {
    const workshopID = this.state.input;
    const remote = require("electron").remote;
    const request = remote.require("request");
    
    const url = "https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/";
    const gameID = this.props.id;
    request.post({
      url: url,
      form: {
        "itemcount": 1,
        "publishedfileids[0]": workshopID
      }
    }, (err, response, body) => {
      if (response.statusCode === 200) {
        // response good and return data
        const data = JSON.parse(body);
        if (data.response.result !== 1) {
          // no workshop items with that id
          // notify user about error
          window.createNotification("No workshop item with id: ", workshopID);
        } else {
          const workshopItemData = data.response.publishedfiledetails[0];
          if (workshopItemData.consumer_app_id !== gameID) {
            window.createNotification("The workshop item you requested is not for the game you have selected");
          } else {
            log.debug("handleSubmit - gameID: ", gameID);
            log.debug("handleSubmit - workshopItemData: ", workshopItemData);
            this.downloadWorkshopItem(gameID, parseInt(workshopItemData.publishedfileid));
            this.props.gameActions.addWorkshopItem(workshopItemData);
          }
          this.setState({ input: "" });
        }
      } else {
        // if get response other than 200 log error and notify user
        window.createNotification("Error occurred collecting the workshop item data");
        log.error("err: ", err);
      }
    });
  }

  openExternalUrl(url) {
    const remote = require("electron").remote;
    const shell = remote.shell;
    const options = { activate: true };
    shell.openExternal(url, options);
  }

  render() {
    const steamwsUrl = "https://steamcommunity.com/app/" + this.props.id + "/workshop/";
    const noBorderStyle = { border: "none" };
    return(
      <div>
        <Row>
          <a onClick={() => this.openExternalUrl(this.props.gameData.website)} href="#">
            <img src={this.props.gameData.imagePath} height="139px"/>
          </a>
          <div style={{ "marginLeft" : "auto" }}>
            <a onClick={() => this.openExternalUrl(steamwsUrl)} href="#">
              <img src="../../static/images/workshop_logo.png" height="139px" />
            </a>
          </div>
        </Row>
        <hr />
        <Row>
          <Col xs="4">
            <Input type="text" name="text" onChange={this.handleInput} value={this.state.input}
              onKeyPress={this.isNumber} placeholder="123456789" />
          </Col>
          <Col xs="8">
            <Button onClick={this.handleSubmit} color="success">Add Workshop Item</Button>
          </Col>
        </Row>
        <br />
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th style={noBorderStyle}></th>
                <th style={noBorderStyle}>Name</th>
                <th style={noBorderStyle}>Last Updated</th>
                <th style={noBorderStyle}></th>
              </tr>
            </thead>
            <tbody>
              {this.state.workshopItems}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}