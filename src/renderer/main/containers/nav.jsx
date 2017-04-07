import React, { Component }  from "react";
import { Nav } from "reactstrap";
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
    var new_navs = this.state.navs.map((navData, index) => {
      // navData = {name: '' , id: 0}
      let activeState = false;
      // if (index === 0) {
      //   activeState = true;
      // }
      return(
        <NavItemWrapper key={index} keyInput={index} active={activeState}
          name={navData.name} handleClick={this.handleClick(index)} />
      );
    });
    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          {new_navs}
        </Nav>
      </nav>
    );
  }
}

export default CustomNav;
