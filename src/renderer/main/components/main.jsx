import React, { Component }  from 'react'
import CustomNav from './nav'
import SplitPane from 'react-split-pane'

import AddGame from './addGame'

// {[
//   {
//     'gameName': 'Arma 3',
//     'imagePreview': imageObj,
//     'appID': '107410',
//     'workshopItemList': [
//       {
//         'workshopID': 'workshopid',
//         'workshopItemName': 'workshopitemname',
//         'workshopImagePreview': imageOjb,
//         'workshopItemUpdateStamp': 'timeStamp',
//         'lastChecked': 'timeStamp'
//       },
//       {
//         // another workshop item and it's data
//       }
//     ]
//   },
//   {
//     // another game and it's workshop items
//   }
// ]}

class Main extends Component {
  constructor(props) {
    super(props)
    this.displayComponent = this.displayComponent.bind(this)
    this.changeComponent = this.changeComponent.bind(this)
    this.getInitNavs = this.getInitNavs.bind(this)
    content = <div></div>
    this.state = {
      navs: this.getInitNavs, // array
      paneContent: content
    }
  }
  getInitNavs() {
    
  }
  addToNav(element) {
    this.setState({navs: this.state.navs.push(element)})
  }
  displayComponent(comp) {
    
  }
  changeComponent(comp) {

  }

  render() {
    return (
      <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <CustomNav>{this.state.navs}</CustomNav>
        </div>
        <div>
          <div className="container-fluid">
            {this.state.paneContent}
          </div>
        </div>
      </SplitPane>
    )
  }
}

// Below is wrapper for flux
const mainCall = () => <Main />

export default mainCall