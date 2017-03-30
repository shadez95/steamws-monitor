import React, { Component }  from 'react'
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

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
      <div>
        <Navbar color="inverse" inverse >
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse className="navbar-toggleable-md" isOpen={!this.state.collapsed}>
          <Nav vertical>
            <NavbarBrand>Components</NavbarBrand>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavbarBrand>reactstrap</NavbarBrand>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

module.exports = Main