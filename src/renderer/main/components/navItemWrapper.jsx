import React, { Component } from "react";
import { NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { currentIndex: state.currentIndex };
};

@connect(mapStateToProps)
export default class NavItemWrapper extends Component {
  constructor(props) {
    super(props);
    this.setSelectedNavItem = this.setSelectedNavItem.bind(this);
  }

  componentWillMount() {
    if (this.props.currentIndex === this.props.index) {
      this.state = {
        active: true
      };
    } else {
      this.state = {
        active: false
      };
    }
  }

  componentWillUpdate() {
    if (this.props.currentIndex === this.props.index) {
      this.state = {
        active: true
      };
    } else {
      this.state = {
        active: false
      };
    }
  }

  setSelectedNavItem() {
    this.props.handleClick(this.props.index, this.state.active);
    this.setState({ active: true });
  }

  render() {
    return(
      <div key={this.props.keyChild}>
        <NavItem>
          <NavLink onClick={this.setSelectedNavItem} href="#"
            active={this.state.active}>{this.props.name}
          </NavLink>
        </NavItem>
      </div>
    );
  }
}