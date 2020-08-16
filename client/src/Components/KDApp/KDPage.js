import React from "react";
import DataWindow from "./DataWindow";
import "../../css/KDApp.css";

const SERVER_URL = "SERVER_URL/API_URL";
const ALL_REGEX = /\[(.*)\]\s\[(.*)\]\s:\s\*\s(.*)\.\s\((.*)\)/g;
const TIME_REGEX = /\[(.*)\d\]/g;
const WEAPONS_REGEX = /\[(.*)\]\s\[(.*)\]\s:\s\*\s(.*)\.\s/g;

class Data {
  constructor(logs, name) {
    this.name = name;
    this.aLogs = [];
    this.logs = {};
    this.data = { name: name };
    this.returnPersonLogs(logs);
  }
  returnPersonLogs = (Ilogs) => {
    this.aLogs = Ilogs.match(ALL_REGEX);
    if (this.aLogs === null) return (this.data = null);
    this.aLogs = this.aLogs.filter((log) => log.includes(this.name));
    this.logs.kills = this.aLogs.filter((log) =>
      log.includes(`* ${this.name}`)
    );
    this.logs.deaths = this.aLogs.filter((log) =>
      log.includes(`${this.name}.`)
    );
    this.logs.weapons = this.logs.kills.map((log) =>
      log.replace(WEAPONS_REGEX, "").replace("(", "").replace(")", "")
    );
    this.logs.deathTimes = this.logs.deaths.map((log) => {
      let deathTime = log
        .match(TIME_REGEX)[0]
        .replace("[", "")
        .replace("]", "");
      return new Date(deathTime).getTime();
    });
    this.generateData();
  };
  generateData = () => {
    this.getKills();
    this.getDeaths();
    this.getKD();
    this.getWeapons();
    this.getKillStreak();
    this.getAverageTimeAlive();
  };
  getKills = () => {
    this.data.kills = this.logs.kills.length || 0;
  };
  getDeaths = () => {
    this.data.deaths = this.logs.deaths.length || 0;
  };
  getKD = () => {
    if (this.data.deaths === 0) {
      this.data.kd = this.data.kills;
    } else {
      this.data.kd = (this.data.kills / this.data.deaths).toFixed(2);
    }
  };
  getWeapons = () => {
    this.data.weaponsCount = {};
    this.logs.weapons.forEach((weapon) => {
      this.data.weaponsCount[weapon]
        ? (this.data.weaponsCount[weapon] += 1)
        : (this.data.weaponsCount[weapon] = 1);
    });
  };
  getKillStreak = () => {
    let currentCount = 0;
    this.data.streak = 0;
    for (let i = 0; i < this.aLogs.length; i++) {
      if (this.aLogs[i].includes(`${this.name}.`)) {
        if (this.data.streak < currentCount) this.data.streak = currentCount;
        currentCount = 0;
      } else {
        currentCount++;
      }
    }
  };
  getAverageTimeAlive = () => {
    this.data.averageTime = 0;
    for (let i = 1; i < this.logs.deathTimes.length; i++) {
      this.data.averageTime +=
        this.logs.deathTimes[i] - this.logs.deathTimes[i - 1];
    }
    this.data.averageTime /= this.logs.deathTimes.length - 1;
    this.data.averageTime = Math.trunc(this.data.averageTime / 1000) || 0;
  };
}

class KDApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: ``,
      name: ``,
      key: "",
      data: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetData = this.resetData.bind(this);
    this.output = this.output.bind(this);
    this.clear = this.clear.bind(this);
  }
  output = () => {
    if (this.state.logs === "") return;
    let dataClass = new Data(this.state.logs, this.state.name);
    if (dataClass.data === null) return;
    if (this.state.name === "") dataClass.data.name = "Total";
    this.setState({
      data: dataClass.data,
    });
    if (this.state.key.length === 8) {
      dataClass.data.key = this.state.key;
      fetch(SERVER_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dataClass.data),
      });
    }
  };
  clear = () => {
    this.setState({
      logs: "",
    });
  };
  handleChange = (e, input) => {
    let tempState = Object.assign({}, this.state);
    tempState[input] = e.target.value;
    this.setState(tempState);
  };
  resetData = () => {
    this.setState({
      data: false,
    });
  };
  render() {
    return (
      <div className="KDAppC">
        <textarea
          onChange={(e) => this.handleChange(e, "logs")}
          placeholder="Paste logs here!"
          value={this.state.logs}
        />
        <div className="Options">
          <input
            onChange={(e) => this.handleChange(e, "name")}
            placeholder="Player Nickname"
            value={this.state.name}
          />
          <input
            onChange={(e) => this.handleChange(e, "key")}
            placeholder="BotKey"
            value={this.state.key}
          />
          <div onClick={this.clear}>Clear</div>
          <div onClick={this.output}>Generate</div>
          <div onClick={() => this.props.changePage("Home")}>Return Home</div>
        </div>
        {this.state.data ? (
          <DataWindow resetData={this.resetData} data={this.state.data} />
        ) : null}
      </div>
    );
  }
}

export default KDApp;
