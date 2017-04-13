import React, { Component }  from "react";
import { NavItem, NavLink, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";

import SplitPane from "react-split-pane";

import CustomNav from "./nav";
import PaneContent from "./paneContent";

import AddGame from "../components/addGame";
import Settings from "../components/settings";

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

// @connect((store) => {
//   return{
//     navs: store.navs.navs
//   };
// })

class Main extends Component {
  render() {
    return (
      <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <CustomNav />
        </div>
        <div>
          <div className="container-fluid">
            <PaneContent />
          </div>
        </div>
      </SplitPane>
    );
  }
}

module.exports = Main;
