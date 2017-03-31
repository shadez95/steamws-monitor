import React, { Component }  from 'react'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Row,
  Col } from 'reactstrap'
import SplitPane from 'react-split-pane'

class Main extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.state = {
      collapsed: true,
      navRight: 650,
      draggable: 645
    }
    this.cssProp = {
      right: this.state.draggable + 'px'
    }
  }

  handleStart() {
    this.cssProp = {right: 'initial'}
  }
  handleDrag(e) {
    console.log("e.x = ", e.x)
    console.log("this.state.draggable = ", this.state.draggable)
    console.log("this.state.draggable + e.x = ", this.state.draggable + e.x)
    this.setState({
      navRight: e.x,
      draggable: e.x
    })
  }
  handleStop() {
    this.cssProp = {right: this.state.navRight - 5 + 'px'}
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