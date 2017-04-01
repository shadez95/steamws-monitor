import React, { Component }  from 'react'
import CustomNav from './nav'
import SplitPane from 'react-split-pane'

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
    // this.state = {
    //   display:
    // }
  }

  displayComponent(comp) {
    
  }
  changeComponent(comp) {

  }

  render() {
    return (
      <SplitPane split="vertical" primary="first" defaultSize={200}>
        <div>
          <CustomNav></CustomNav>
        </div>
        <div>
          <div className="container-fluid">
            <h1>Test Title</h1>
          </div>
        </div>
      </SplitPane>
    )
  }
}

// Below is wrapper for flux
const mainCall = () => <Main />

export default mainCall