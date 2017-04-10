import React, { Component }  from "react";
import { Nav, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as navActionCreators from "../../../store/actions/navActions";

import NavItemWrapper from "../components/navItemWrapper";

const mapStateToProps = (state) => {
  return { navData: state.navData };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators( navActionCreators, dispatch) };
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
            <NavItemWrapper key={index} keyChild={index}
              index={index} name={navData.name} handleClick={this.handleClick} />
          </div>
        );
      }

      if (index === 1) {
        return(
          <div key={index}>
            <NavItemWrapper key={index} keyChild={index}
              index={index} name={navData.name} handleClick={this.handleClick} />
              <hr key={-100} style={hrStyle} />
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

  handleClick(index) {
    //Dispatch action here maybe?
    // this.props.selectedSidebarItem(index);
    // this.selectedSidebarItem = index;
    console.log("[nav.jsx] CustomNav - handleClick index: ", index);
    console.log("props: ", this.props);
    this.props.actions.setSelectedSidebarItem(index);
    this.setState({ currentIndex: index });
    // console.log(this.state.navs[index]);
    // this.state.navs[index].props.active = true;
  }

  render() {

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
