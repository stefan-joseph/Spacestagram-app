import "./App.css";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    selectedFeed: "today",
  };

  handleChangeFeed = (selectedFeed) => {
    this.setState({ selectedFeed });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          selectedFeed={this.state.selectedFeed}
          onChangeFeed={this.handleChangeFeed}
        />
        <Feed feed={this.state.selectedFeed} />
      </div>
    );
  }
}
