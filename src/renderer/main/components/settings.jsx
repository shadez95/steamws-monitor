import React, { Component }  from 'react'
import { NavItem, NavLink } from 'reactstrap'

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <h1>Settings</h1>
    )
  }
}

Settings.nav = (
  <NavItem>
    <NavLink href="" >Add a Game</NavLink>
  </NavItem>
)