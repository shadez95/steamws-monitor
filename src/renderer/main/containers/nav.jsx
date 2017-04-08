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
    console.log("[nav.jsx] CustomNav - handleClick index: ", index);  
  }

  render() {
    console.log("this.state.navs: ", this.state.navs);

    let activeState = false;
    const hrStyle = { borderStyle: "ridge", marginLeft: "0px", marginRight: "0px" };

    var navs_array = this.state.navs.map((navData, index) => {
      // navData = {name: '' , id: 0}
      if (index === 0) {
        return (
          <div key={index}>
            <NavbarBrand key={-3}>Steam Workshop Monitor</NavbarBrand>
            <NavItemWrapper key={index} keyChild={index} active={activeState}
              index={index} name={navData.name} handleClick={this.handleClick} />
          </div>
        );
      }

      if (index === 1) {
        return(
          <div key={index}>
            <NavItemWrapper key={index} keyChild={index} active={activeState}
              index={index} name={navData.name} handleClick={this.handleClick} />
              <hr key={-100} style={hrStyle} />
          </div>
        );
      }

      return(
        <NavItemWrapper key={index} keyChild={index} active={activeState}
          index={index} name={navData.name} handleClick={this.handleClick} />
      );
    });

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
