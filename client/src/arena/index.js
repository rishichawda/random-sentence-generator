import React, { Component } from "react";
import axios from "axios";
import "./index.scss";

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:9000'

const INITIAL_STATE = {
  text: "",
  pos: 0,
  timer: 10,
  typeState: [],
  progress: [],
  timeElapsed: 0,
  showResults: false,
  current: '',
};

export default class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown");
  }

  fetchData = () => {
    const { pos } = this.state;
    const res = axios.get(baseUrl);
    res.then(({ data: { text } }) => {
      this.setState({ text, current: text.split(" ")[pos] });
      this.timer = setInterval(() => {
        const { timer } = this.state;
        if (timer === 0) {
          document.addEventListener("keydown", this.registerKeyDown);
          clearInterval(this.timer);
          this.startWatch();
        } else {
          this.setState(prev => ({ timer: prev.timer - 1 }));
        }
      }, 1000);
    }).catch(() => {
      this.fetchData();
    });
  };

  generateCurrent = () => {
    const { current, typeState } = this.state;
    const alphabets = current.split("");
    return alphabets.map((char, index) => {
      const state = typeState[index] === char ? "typed char" : "char";
      return (
        <span key={`${state}-${char}-${index + 1}`} className={state}>
          {char}
        </span>
      );
    });
  };

  generateText = () => {
    const { text, progress } = this.state;
    return text
      ? text.split("").map((char, index) => (
        <span
          className={char === progress[index] ? "progressed" : undefined}
          key={`generated-content-${char}-${index + 1}`}
        >
          {char}
        </span>
        ))
      : null;
  };

  registerKeyDown = ({ key }) => {
    const { current, typeState, text, pos, progress } = this.state;
    if (current.length === typeState.length && key === " ") {
      progress.push(key);
      this.setState({
        current: text.split(" ")[pos + 1],
        pos: pos + 1,
        typeState: [],
        progress: [...progress]
      });
    } else if (current.charAt(typeState.length) === key) {
      typeState.push(key);
      progress.push(key);
      this.setState({
        typeState: [...typeState],
        progress: [...progress]
      });
    }
    if (text.length === progress.length) {
      clearInterval(this.watch);
      document.removeEventListener("keydown", this.registerKeyDown);
      const { timeElapsed } = this.state;
      this.setState({
        showResults: true,
        wpm: Math.floor((text.split(" ").length / timeElapsed) * 60)
      });
    }
  };

  reset = () => {
    if (this.timer) clearInterval(this.timer);
    if (this.watch) clearInterval(this.watch);
    this.setState(INITIAL_STATE, () => {
      this.fetchData();
    });
  };

  startWatch = () => {
    this.watch = setInterval(() => {
      this.setState(prev => ({
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);
  };

  render() {
    const { text, timer, current, timeElapsed, showResults, wpm } = this.state;
    const seconds =
      timeElapsed % 60 > 9 ? timeElapsed % 60 : `0${timeElapsed % 60}`;
    const minutes =
      (timeElapsed - seconds) / 60 > 10
        ? (timeElapsed - seconds) / 60
        : `0${(timeElapsed - seconds) / 60}`;
    return (
      <div className="app-container">
        <div className="navbar">
          <p>Simple Typeracer</p>
        </div>
        <div className="arena">
          <div className={`timer ${timer === 0 && "hide"}`}>
            {text.length
              ? `${timer === 0 ? "Let's go!!" : `${timer} seconds to start!`}`
              : "Fetching text.."}
          </div>
          {text.length ? <div className="generated-text">{this.generateText()}</div>
            : <div className="loader" />}
          {!showResults ? (
            <div className="current-word">
              {current && this.generateCurrent(current)}
            </div>
          ) : (
            <div className="results">
              <h4>Results</h4>
              <p>{`Total time : ${minutes} minutes, ${seconds} seconds`}</p>
              <p>{`Speed : ${wpm} words per minute`}</p>
            </div>
          )}
        </div>
        {!showResults ? (
          <div className={`watch ${timeElapsed !== 0 && "show"}`}>
            {`Time elapsed  ${minutes} : ${seconds}`}
          </div>
        ) : (
          <button type="button" className="reset-button" onClick={this.reset}>
            Try again
          </button>
        )}
      </div>
    );
  }
}
