import React from 'react';

export default class EmojiWall extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: null
    }
  }

  async componentDidMount() {
    let response = await window.fetch('https://raw.githubusercontent.com/iamcal/emoji-data/master/sheet_apple_32.png');
    let imgBlob = await response.blob();
    this.setState({
      backgroundImage: URL.createObjectURL(imgBlob)
    });
  }

  handleDrag(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="emoji-wall">
        <img onDrag={this.handleDrag.bind(this)} src={this.state.backgroundImage} alt="Wall of emoji" width="580px"></img>
      </div>
    );
  }
}
