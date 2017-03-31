import React, { Component }  from 'react'
import CustomNav from './nav'

class Main extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <CustomNav>
          <div>
            <h2>Test Title</h2>
            <p>Test text</p>
          </div>
        </CustomNav>
      </div>
    )
  }
}

module.exports = Main