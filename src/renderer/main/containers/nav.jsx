import React, { Component }  from "react";
import { Nav, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as navActionCreators from "../../store/actions/navActions";

import NavItemWrapper from "../components/navItemWrapper";

const mapStateToProps = (state) => {
  return { navData: state.navData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {navData: this.props.navData.navData, currentIndex: 0, navs: null};

    const hrStyle = { borderStyle: "ridge", marginLeft: "0px", marginRight: "0px" };

    var navsArray = this.state.navData.map((navData, index) => {
      // navData = {name: '' , id: 0}
      if (index === 0) {
        return (
          <div key={index}>
            <NavbarBrand key={-3}>Steam Workshop Monitor</NavbarBrand>
            <NavItemWrapper key={index} keyChild={index} id={navData.id}
              index={index} name={navData.name} handleClick={this.handleClick} />
          </div>
        );
      }

      if (index === 1) {
        return(
          <div key={index}>
            <NavItemWrapper key={index} keyChild={index}
              index={index} name={navData.name} handleClick={this.handleClick} />
              <NavbarBrand>Steam Games</NavbarBrand>
          </div>
        );
      }

      return(
        <NavItemWrapper key={index} keyChild={index}
          index={index} name={navData.name} handleClick={this.handleClick} />
      );
    });
    this.state.navs = navsArray;
  }

  handleClick(index, id) {
    this.props.navActions.setSelectedSidebarItem(index, id);
    this.setState({ currentIndex: index });
  }

  render() {
    console.log("[nav.jsx] render - this.props: ", this.props);
    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          {this.state.navs}
        </Nav>
      </nav>
    );
  }
}

export default CustomNav;
