import React, { Component } from "react";

class Introduction extends Component {
  render() {
    return (
      <div>
        <p className="HeaderText">Welcome to the K/D Bot usage guide</p>
        <p>
          This bot was built to allow the display of K/D application results
          without the need of screening or copying anything by sending the full
          data to a discord channel.
        </p>
        <br />
        <p className="HeaderText">More Info:</p>
        <p>
          For more info join Clock Corporation's official discord server just by
          clicking on{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://discord.gg/ZSHyjpb"
          >
            this link
          </a>
          .
        </p>
        <br />
        <p className="HeaderText">Credits:</p>
        <p>
          The web application and bot were both developed by{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/FilexGH"
          >
            FilexGH
          </a>{" "}
          and published by Clock Corporation, the project is an open source you
          can have a look on{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/FilexGH/CC-KD-Website"
          >
            the github repository.
          </a>
        </p>
      </div>
    );
  }
}

export default Introduction;
