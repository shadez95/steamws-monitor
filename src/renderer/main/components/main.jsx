import React, { Component }  from "react";
import { NavItem, NavLink, NavbarBrand } from "reactstrap";
import SplitPane from "react-split-pane";
import { Link } from "react-router";

import AddGame from "./addGame";
import CustomNav from "./nav";
import Settings from "./settings";

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
    // const content = <h1>Home Page</h1>;
    // const components = [Settings];
    // console.log("[main.jsx] constructor - components: ", components);
    // const navs = [];
    // this.state = {
    //   navs: navs, // array
    //   paneContent: content
    // };
  }

  componentWillMount() {
    const componentNavs = [this.constructor, AddGame, Settings];
    let arr = [];
    for (let i=0; i < componentNavs.length; i++) {
      console.log("arr: ", arr);
      console.log(componentNavs[i].nav(i));
      console.log("components[i].nav(i): ", componentNavs[i].nav(i));
      arr.push(componentNavs[i].nav(i));
    }

    console.log("[main.jsx] componentWillMount - arr: ", arr);
    const content = <h1>Home Page</h1>;
    this.state = {
      navs: arr,
      paneContent: content
    };
  }

  static nav = function(inputKey) {
    return(
      <div key={inputKey}>
        <NavbarBrand>Steam Workshop Monitor</NavbarBrand>
        <NavItem>
          <NavLink tag={Link} to="/" activeClassName="active">Home</NavLink>
        </NavItem>
      </div>
    );
  }

  getInitNavs(components) {
    console.log("[main.jsx] getInitNavs - Executed...");
    console.log("[main.jsx] getInitNavs - components: ", components);
    var arr = [];
    console.log("[main.jsx] getInitNavs - components.length: ", components.length);
    for (let i=0; i < components.length; i++) {
      console.log("arr: ", arr);
      console.log(components[i].nav(i));
      console.log("components[i].nav(i): ", components[i].nav(i));
      arr.push(components[i].nav(i));
    }

    return arr;
  }

  addToNav(element) {
    this.setState({navs: this.state.navs.push(element)});
  }
  displayComponent(comp) {
    
  }
  changeComponent(comp) {

  }

  render() {
    console.log("[main.jsx] render - this.state.paneContent: ", this.state.paneContent);
    console.log("[main.jsx] render - this.state.navs: ", this.state.navs);
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
    );
  }
}

// module.exports = Main