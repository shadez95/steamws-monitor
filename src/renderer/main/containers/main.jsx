import React, { Component }  from "react";
import { connect } from "react-redux";
import SplitPane from "react-split-pane";

import CustomNav from "./nav";
import PaneContent from "./paneContent";

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
const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    disable: state.loading.disable
  };
};

@connect(mapStateToProps)
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: this.props.loading,
      disable: this.props.disable
    };
  }

  loadHandler() {
    this.setState({ loading: "loader", disable: "block" });
  }

  render() {
    var divStyle = {
      display:this.state.disable ? "block":"none"
    };

    return (
      <div>
        <div className={this.state.loading}></div>
        <div id="cover" style={divStyle}></div>
        <SplitPane split="vertical" primary="first" defaultSize={200}>
          <div>
            <CustomNav />
          </div>
          <div>
            <div className="container-fluid">
              <PaneContent />
            </div>
          </div>
        </SplitPane>
      </div>
    );
  }
}

module.exports = Main;
