import React, { Component }  from 'react'
import CustomNav from './nav'

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

// Below is wrapper for flux
const mainCall = () => <Main />

export default mainCall