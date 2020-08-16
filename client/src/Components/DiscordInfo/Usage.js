import React, { Component } from "react";
import KDHelp from "../../images/DiscordInfo/KDHelp.jpg";
import KDGenerate from "../../images/DiscordInfo/KDGenerate.jpg";
import KDUpdate from "../../images/DiscordInfo/KDUpdate.jpg";
import KDDelete from "../../images/DiscordInfo/KDDelete.jpg";
import KDKey from "../../images/DiscordInfo/KDKey.jpg";
import KDPost from "../../images/DiscordInfo/KDPost.jpg";

class Usage extends Component {
  render() {
    return (
      <div>
        <p>
          {" "}
          After inviting the bot you can check the commands by typing{" "}
          <strong>'!kd help'</strong>
        </p>
        <br />
        <div>
          <img alt="HelpPic" src={KDHelp} />
        </div>
        <br />
        <p>
          To generate a key you need to simply type{" "}
          <strong>"!kd generate"</strong>
        </p>
        <br />
        <div>
          <img alt="GeneratePic" src={KDGenerate} />
        </div>
        <br />
        <p>
          In case your key gets leaked you can update it by typing{" "}
          <strong>"!kd generate"</strong> again
        </p>
        <br />
        <div>
          <img alt="UpdatePic" src={KDUpdate} />
        </div>
        <br />
        <p>
          In case you don't want the bot to be usable anymore on that channel,
          delete the key by typing <strong>"!kd delete"</strong>
        </p>
        <br />
        <div>
          <img alt="DeletePic" src={KDDelete} />
        </div>
        <br />
        <p>
          In order to post your data from the website application to the discord
          channel you need to type the key in the required case
        </p>
        <br />
        <div>
          <img alt="KeyPic" src={KDKey} />
        </div>
        <br />
        <p>And bingo your K/D is posted!</p>
        <br />
        <div>
          <img alt="PostPic" src={KDPost} />
        </div>
      </div>
    );
  }
}

export default Usage;
