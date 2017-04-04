import React, { Component }  from 'react'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Row,
  Col } from 'reactstrap'
import SplitPane from 'react-split-pane'

export default class CustomNav extends Component {
  constructor(props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <nav className="hidden-xs-down bg-faded sidebar">
        <Nav vertical pills >
          <NavItem>
            <NavLink href="#" onClick={this.props.AddGame} >Add a Game</NavLink>
          </NavItem>
          <NavbarBrand>Components</NavbarBrand>
          <NavItem>
            <NavLink active href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Testing length in nav</NavLink>
          </NavItem>
          <NavbarBrand>reactstrap</NavbarBrand>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
          </NavItem>
        </Nav>
      </nav>
    )
  }
}