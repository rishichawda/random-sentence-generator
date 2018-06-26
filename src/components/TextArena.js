import React, { Component } from 'react';
import styles from './styles/styles';


class TextArena extends Component {

    constructor(props) {
      super(props);
      this.state = {
        totaltime: 0,
        completed: false
      }
      this.text = this.props.randomText;
      // Flag to check if user has started typing. Used to setting start time for timer.
      this.started = false;
      this.handleChange = this.handleChange.bind(this);
      // Array to store correct input words typed by user.
      this.correctinput = [];
    }

    componentWillReceiveProps(props) {
      if(this.text !== props.randomText) {
        this.text = props.randomText;
      }
    }

    handleChange(e) {
        if(!this.started) {
          this.started = true;
          this.starttime = new Date().getTime();
        }
        var words = e.target.value.split(' ');
        var last_word = words[words.length-2];
        if(words[words.length-1]==='') {
          // Space character represents new word input ( Since we have to check and stop at incorrect words )
          var last_word_from_randomtext = this.text[words.length-2];
          if(last_word_from_randomtext) {
            if(last_word_from_randomtext.indexOf(last_word)===-1){
              // Last input word is not a substring of word from random text at that index.
              this.correctinput = words.splice(0,words.length-2);
            } else {
              if (last_word_from_randomtext.indexOf(last_word)!==-1 && last_word_from_randomtext.length!==last_word.length) {
                // Last input word does not match the word from random text at that particular index.
                this.correctinput = words.splice(0,words.length-2);
              } else {
                // Last input word matches the word from random text at that particular index.
                this.correctinput = words.splice(0,words.length-1);
              }
            } 
            // Update textarea input. removes last incorrect word.
            e.target.value = this.correctinput.join(' ') + ' ';
          } 
          } else { 
            this.correctinput = words.splice(0,words.length);
          }
        if((this.correctinput.length===this.text.length)
            && this.correctinput[this.correctinput.length-1]===this.text[this.text.length-1] && this.state.totaltime===0) {
              // All words have been correctly typed. Store total time in seconds and set completed flag to true.
          this.setState({
            totaltime: Math.round((new Date().getTime() - this.starttime)/1000),
            completed: true
          })
        }
      }
      
    render () {
      var minutes = (Math.floor(this.state.totaltime/60) < 0) ? 0 : Math.floor(this.state.totaltime/60);
      var seconds = (this.state.totaltime%60) < 0 ? 0 : this.state.totaltime%60;
      var words_perminute = (Math.round(this.text.length/(this.state.totaltime/60)))
      return (
        <div className="mt-5">
          <p className="lead">Type here : </p>
        <textarea className="w-100" style={styles.textstyle} onChange={this.handleChange} ref={this.props.textRef}></textarea>
        { this.state.totaltime!==0 &&
          <div className="alert alert-success" role="alert">
            <p>Completed! Your total time was <strong>{minutes} minutes and {seconds} seconds</strong></p>
            <p><strong>Words per minute : </strong>{words_perminute}</p>
          </div>
        }
        </div>
      )
    }
}

export default TextArena;