import React, { Component }  from 'react'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Row,
  Col } from 'reactstrap'

class Main extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <Row>
          <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
            <Nav vertical pills >
              <NavbarBrand>Components</NavbarBrand>
              <NavItem>
                <NavLink active href="/components/">Components</NavLink>
              </NavItem>
              <NavbarBrand>reactstrap</NavbarBrand>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
              <NavbarBrand>Add a Game</NavbarBrand>
            </Nav>
          </nav>
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <h2>Test Title</h2>
            <p>Test text</p>
          </main>
        </Row>
      </div>
    )
  }
}

module.exports = Main