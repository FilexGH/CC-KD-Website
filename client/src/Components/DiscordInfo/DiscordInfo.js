import React from "react";
import "../../css/DiscordInfo.css";
import Indexer from "./Indexer";
import Introduction from "./Introduction";
import Invite from "./Invite";
import Usage from "./Usage";

const CONTENTS = {
  Introduction: <Introduction />,
  Invite: <Invite />,
  Usage: <Usage />,
};

class DiscordInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: {
        Introduction: "Active",
        Invite: "",
        Usage: "",
      },
      currentContent: "Introduction",
    };
    this.changeContent = this.changeContent.bind(this);
  }

  changeContent = (Content) => {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.buttons[this.state.currentContent] = "";
    stateCopy.buttons[Content] = "Active";
    stateCopy.currentContent = Content;
    this.setState(stateCopy);
  };
  render() {
    return (
      <div className="DiscordInfo">
        <Indexer
          changePage={this.props.changePage}
          changeContent={this.changeContent}
          buttonsStates={this.state.buttons}
        />
        <div className="Content">{CONTENTS[this.state.currentContent]}</div>
      </div>
    );
  }
}

export default DiscordInfo;
