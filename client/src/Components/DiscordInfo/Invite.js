import React, { Component } from "react";
import BotPic from "../../images/DiscordInfo/BotPic.jpg";

class Invite extends Component {
  render() {
    return (
      <div>
        <p>
          Follow the discord bot inviting steps after clicking on{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://discord.com/api/oauth2/authorize?client_id=743989104198418525&permissions=0&scope=bot`}
          >
            this link.
          </a>
        </p>
        <br />
        <p>
          Make sure the bot has writing and reading rights on your preferred
          channel then follow the steps mentioned on <strong>Usage.</strong>{" "}
        </p>
        <br />
        <div>
          <img alt="BotPic" src={BotPic} />
        </div>
      </div>
    );
  }
}

export default Invite;
