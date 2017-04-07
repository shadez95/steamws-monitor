import React, { Component }  from "react";
import { Nav, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";

import NavItemWrapper from "../components/navItemWrapper";

const mapStateToProps = (state) => {
  return {navs: state.navs};
};

@connect(mapStateToProps)
class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.state = {navs: this.props.navs.navs};
    // this.state.navs = [{}, {}]
  }
  handleClick(index) {
    //Dispatch action here maybe?
    // this.props.selectedSidebarItem(index);
    // this.selectedSidebarItem = index;
    console.log("[nav.jsx] CustomNav - handleClick this: ", this);  
  }

  render() {
    console.log("this.state.navs: ", this.state.navs);
    let activeState = false;
    var navs_array = this.state.navs.map((navData, index) => {
      // navData = {name: '' , id: 0}
      // if (index === 0) {
      //   activeState = true;
      // }
      return(
        <NavItemWrapper key={index} keyChild={index} active={activeState}
          name={navData.name} handleClick={this.handleClick(index)} />
      );
    });
    
    var brandComponent = <NavbarBrand key={-3}>Steam Workshop Monitor</NavbarBrand>;
    var addGameComponent = <NavItemWrapper key={-1} keyChild={-1} active={activeState}
            name={"Add a Game"} handleClick={this.handleClick(-1)} />;
    var settingsComponent = <NavItemWrapper key={-2} keyChild={-2} active={activeState}
            name={"Settings"} handleClick={this.handleClick(-2)} />;

    navs_array.unshift(brandComponent, addGameComponent, settingsComponent);

    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          {navs_array}
        </Nav>
      </nav>
    );
  }
}

export default CustomNav;
