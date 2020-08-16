import React from "react";
import "./css/App.css";
import Home from "./Components/Home";
import KDApp from "./Components/KDApp/KDPage";
import HomePic from "./images/Backgrounds/HomePic.jpg";
import DiscordInfoPic from "./images/Backgrounds/DiscordInfoPic.jpg";
import KDAppPic from "./images/Backgrounds/KDPic.jpg";
import DiscordInfo from "./Components/DiscordInfo/DiscordInfo";

const BACKGROUND_IMAGES = {
  Home: HomePic,
  KDApp: KDAppPic,
  DiscordInfo: DiscordInfoPic,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Page: "Home",
    };
    this.changePage = this.changePage.bind(this);
    this.PAGES = {
      Home: <Home changePage={this.changePage} />,
      KDApp: <KDApp changePage={this.changePage} />,
      DiscordInfo: <DiscordInfo changePage={this.changePage} />,
    };
  }
  changePage = (page) => {
    document.body.style.backgroundImage = `url(${BACKGROUND_IMAGES[page]})`;
    this.setState({
      Page: page,
    });
  };
  render() {
    return (
      <>
        <div className="Avaibility">NOT AVAIBLE ON THIS DEVICE SIZE</div>
        <div className="App">{this.PAGES[this.state.Page]}</div>
      </>
    );
  }
}

export default App;
