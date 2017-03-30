import React, { Component } from 'react';
import { Window, TitleBar, Text } from 'react-desktop/windows';

class Main extends Component {
  constructor(props) {
    super(props)

    this.cssProps = {
      color: '#cc7f29',
      theme: 'light'
    }
  }

  render() {
    return (
      <Window
        color={this.cssProps.color}
        theme={this.cssProps.theme}
        chrome
        height="300px"
        padding="12px"
      >
        <TitleBar title="My Windows Application" controls/>
        <Text color={this.cssProps.theme === 'dark' ? 'white' : '#333'}>Hello World</Text>
      </Window>
    )
  }
}

module.exports = Main