import React from "react";

import "./App.scss";
import Arena from "./arena";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };

    this.hideModal = () => this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    return (
      <div className="app">
        <div className={`modal ${showModal ? "show" : "hide"}`}>
          <h4>Welcome to Simple Typeracer!</h4>
          <p>
            You can practice and improve your typing speed by typing the text
            provided ( generated randomly ). At the end of each trial, you get
            your calculated typing speed.
          </p>
          <button type="button" onClick={this.hideModal}>
            Start
          </button>
        </div>
        {!showModal && <Arena />}
      </div>
    );
  }
}

export default App;
