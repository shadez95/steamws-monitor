import React, { Component }  from "react";
import { NavItem, NavLink, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";

import SplitPane from "react-split-pane";
import AddGame from "../components/addGame";
import CustomNav from "../components/nav";
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
  constructor(props) {
    super(props);
    this.displayComponent = this.displayComponent.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
    this.getInitNavs = this.getInitNavs.bind(this);
    const content = <h1>Home Page</h1>;
    
    const componentNavs = [this.constructor, AddGame, Settings];
    let arr = [];
    for (let i=0; i < componentNavs.length; i++) {
      // console.log("arr: ", arr);
      // console.log(componentNavs[i].nav(i));
      // console.log("components[i].nav(i): ", componentNavs[i].nav(i));
      arr.push(componentNavs[i].nav(i, (e, component, componentState) => {
        console.log("[main.jsx] constructor - callback: ", e);
        this.setState({paneContent: component});
        componentState.active = true;
      }));
    }

    this.state = {
      navs: arr, // array
      paneContent: content
    };
  }

  componentWillMount() {
    console.log("[main.jsx] componentWillMount");
    // const componentNavs = [this.constructor, AddGame, Settings];
    // let arr = [];
    // for (let i=0; i < componentNavs.length; i++) {
    //   // console.log("arr: ", arr);
    //   // console.log(componentNavs[i].nav(i));
    //   // console.log("components[i].nav(i): ", componentNavs[i].nav(i));
    //   arr.push(componentNavs[i].nav(i, (component) => {
    //     this.setState({paneContent: ()})
    //   }));
    // }

    // console.log("[main.jsx] componentWillMount - arr: ", arr);
    // // const content = <h1>Home Page</h1>;
    // this.state = {
    //   navs: arr,
    //   paneContent: content
    // };
  }

  componentWillUpdate() {
    console.log("[main.jsx] componentWillUpdate");
  }

  static nav = function(inputKey) {
    return(
      <div key={inputKey}>
        <NavbarBrand>Steam Workshop Monitor</NavbarBrand>
        <NavItem>
          <NavLink href="#" active>Home</NavLink>
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

function mapStateToProps(state) {
  return {

  };
}

module.exports = Main;
