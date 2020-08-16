import React from "react";
import "../css/Home.css";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="DivImages">
          <div
            onClick={() => this.props.changePage("KDApp")}
            className="NavContainer"
          >
            <div className="KDApp"></div>
            <div className="Name">K/D Application</div>
          </div>
          <div
            onClick={() => this.props.changePage("DiscordInfo")}
            className="NavContainer"
          >
            <div className="DiscordBot"></div>
            <div className="Name">Discord Bot Info</div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
