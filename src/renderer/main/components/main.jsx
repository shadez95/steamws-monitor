import React, { Component }  from 'react'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Row,
  Col } from 'reactstrap'
import SplitPane from 'react-split-pane'

class Main extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <nav className="hidden-xs-down bg-faded sidebar">
            <Nav vertical pills >
              <NavbarBrand>Add a Game</NavbarBrand>
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
        </div>
        <div>
          <div className="container-fluid">
            <h2>Test Title</h2>
            <p>Test text</p>
          </div>
        </div>
      </SplitPane>
    )
  }
}

module.exports = Main