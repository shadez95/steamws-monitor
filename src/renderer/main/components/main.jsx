import React, { Component }  from "react";
import SplitPane from "react-split-pane";
import { Route } from "react-router";

import AddGame from './addGame';
import CustomNav from './nav';
import Settings from './settings';

// {[
//   {
//     'gameName': 'Arma 3',
//     'imagePreview': imageObj,
//     'appID': '107410',
//     'workshopItemList': [
//       {
//         'workshopID': 'workshopid',
//         'workshopItemName': 'workshopitemname',
//         'workshopImagePreview': imageOjb,
//         'workshopItemUpdateStamp': 'timeStamp',
//         'lastChecked': 'timeStamp'
//       },
//       {
//         // another workshop item and it's data
//       }
//     ]
//   },
//   {
//     // another game and it's workshop items
//   }
// ]}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.displayComponent = this.displayComponent.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
    this.getInitNavs = this.getInitNavs.bind(this);
    const content = <h1>Home Page</h1>;
    const components = [Settings];

    this.state = {
      navs: this.getInitNavs(components), // array
      paneContent: content
    };

    window.DynamicRoutes.push(<Route path="settings" component={Settings}/>);
  }
  getInitNavs(components) {
    let _return = []
    components.map((component, idx) => _return.push(component.nav(idx)));
    return _return;
  }
  addToNav(element) {
    this.setState({navs: this.state.navs.push(element)})
  }
  displayComponent(comp) {
    
  }
  changeComponent(comp) {

  }

  render() {
    console.log("[main.jsx] render - this.state.paneContent", this.state.paneContent)
    return (
      <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <CustomNav>{this.state.navs}</CustomNav>
        </div>
        <div>
          <div className="container-fluid">
            {this.state.paneContent}
          </div>
        </div>
      </SplitPane>
    )
  }
}

// module.exports = Main