import React, { Component } from "react";

export default class Indexer extends Component {
  render() {
    return (
      <div className="Indexer">
        <div className="IndexTitle">Index</div>
        <div
          onClick={() => this.props.changeContent("Introduction")}
          className="Buttons"
        >
          <div
            className={"ButtonState " + this.props.buttonsStates.Introduction}
          ></div>
          <p>Introduction</p>
        </div>
        <div
          onClick={() => this.props.changeContent("Invite")}
          className="Buttons"
        >
          <div
            className={"ButtonState " + this.props.buttonsStates.Invite}
          ></div>
          <p>Invite K/D Bot</p>
        </div>
        <div
          onClick={() => this.props.changeContent("Usage")}
          className="Buttons"
        >
          <div
            className={"ButtonState " + this.props.buttonsStates.Usage}
          ></div>
          <p>Usage</p>
        </div>
        <div
          onClick={() => this.props.changePage("Home")}
          className="ReturnButton"
        >
          Return Home
        </div>
      </div>
    );
  }
}
