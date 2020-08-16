import React from "react";
import "../../css/DataWindow.css";
import html2canvas from "html2canvas";

const IMAGE_WINDOW_STYLES = `
    img {
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
    }
`;

class DataWindow extends React.Component {
  containerRef = React.createRef(this);
  returnStaticData = () => {
    let returnString = [];
    returnString.push(<p>Static Data:</p>);
    returnString.push(<br />);
    returnString.push(<p>Number of Kills: {this.props.data.kills}</p>);
    returnString.push(<p>Number of Deaths: {this.props.data.deaths}</p>);
    if (this.props.data.name !== "") {
      returnString.push(<p>K/D: {this.props.data.kd}</p>);
      returnString.push(<p>Kill Streak: {this.props.data.streak}</p>);
      returnString.push(
        <p>Average Time Alive: {this.props.data.averageTime}s</p>
      );
    }
    returnString.push(<br />);
    return returnString;
  };
  returnWeaponsData = () => {
    let returnString = [];
    returnString.push(<p>Weapons:</p>);
    returnString.push(<br />);
    for (let weaponName in this.props.data.weaponsCount) {
      returnString.push(
        <p>
          {weaponName}: {this.props.data.weaponsCount[weaponName]}
        </p>
      );
    }
    return returnString;
  };
  returnDataString = () => {
    let sd = this.returnStaticData();
    let wd = this.returnWeaponsData();
    setTimeout(() => {
      this.returnCanvas();
    }, 50);
    return sd.concat(wd);
  };
  returnCanvas = () => {
    html2canvas(this.containerRef.current).then(
      this.outputCanvasInDifferentWindow
    );
  };
  outputCanvasInDifferentWindow = (canvas) => {
    let w = window.open("");
    let img = w.document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    let style = w.document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(IMAGE_WINDOW_STYLES));
    w.document.head.appendChild(style);
    w.document.body.appendChild(img);
  };
  render() {
    return (
      <div className="DataWindow">
        <div ref={this.containerRef} className="Container">
          <div className="Title">Output - {this.props.data.name}</div>
          <div className="MainContent">{this.returnDataString()}</div>
          <div onClick={this.props.resetData} className="Close">
            Close
          </div>
        </div>
      </div>
    );
  }
}

export default DataWindow;
