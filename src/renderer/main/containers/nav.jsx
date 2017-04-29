import React, { Component }  from "react";
import { Nav, NavbarBrand } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as navActionCreators from "../../store/actions/navActions";
import * as paneContentActions from "../../store/actions/paneContentActions";
import * as gameActionCreators from "../../store/actions/gameActions";

import NavItemWrapper from "./navItemWrapper";

const mapStateToProps = state => {
  return { navData: state.navData };
};

const mapDispatchToProps = dispatch => {
  return {
    navActions: bindActionCreators(navActionCreators, dispatch),
    paneContentActions: bindActionCreators(paneContentActions, dispatch),
    gameActions: bindActionCreators(gameActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class CustomNav extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.generateNav = this.generateNav.bind(this);

    const navs = this.generateNav(this.props.navData.navData);
    this.state = {
      navs: navs,
    };
    // const hrStyle = { borderStyle: "ridge", marginLeft: "0px", marginRight: "0px" };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navData.navData.length !== this.props.navData.navData.length) {
      const navs = this.generateNav(nextProps.navData.navData);
      this.setState({ navs: navs });
    }
  }

  generateNav(data) {
    return data.map((navData, index) => {
      return(
        <NavItemWrapper key={index} keyChild={index} id={navData.id}
          index={index} name={navData.name} handleClick={this.handleClick} />
      );
    });
  }

  handleClick(index, id) {
    this.props.navActions.setSelectedSidebarItem(index, id);
    console.log("[nav.jsx] CustomNav - changing pane content id: ", id);
    this.props.paneContentActions.changePaneContent(id);
    this.props.gameActions.changeGamePane(id);
  }

  render() {
    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          <div key={-3}>
            <NavbarBrand>Steam Workshop Monitor</NavbarBrand>
            <NavItemWrapper keyChild={-3} id={-2}
              index={-3} name="Add a Game" handleClick={this.handleClick} />
          </div>
          <div key={-1}>
            <NavItemWrapper keyChild={-1} id={-1}
              index={-1} name="Settings" handleClick={this.handleClick} />
              <NavbarBrand>Steam Games</NavbarBrand>
          </div>
          {this.state.navs}
        </Nav>
      </nav>
    );
  }
}

export default CustomNav;
