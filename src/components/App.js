import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gettext } from '../actions';
import RandomTextCard from './RandomTextCard';
import Typography from '@material-ui/core/Typography';
import TextArena from './TextArena';
import Appbar from './Appbar';
import CardActions from '@material-ui/core/CardActions';
import { IconButton, Icon } from '@material-ui/core';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: []
    }
    this.textarearef = createRef();
  }

  processText() {
    var string = this.props.randomtext[0].text_out.split('<p>').map(
      (value) => {
        return value.substring(0,value.length-5)
      }
    );
    string = string.splice(1,string.length);
    this.text = string.join(' ').split(' ');
    return string.join(' ')
  }

  reload = () => {
    if(window.confirm('Are you sure you want to restart?')){
      this.textarearef.current.value = '';
      this.props.gettext();
    }
  }

  componentWillMount() {
    this.props.gettext();
  }

  render() {
    if(this.props.randomtext[0]){
      return (
        <div className="container-fluid bg-light h-50 p-0">
            <Appbar/>
            <div className="px-5 mt-3">
            <RandomTextCard actions={
              <CardActions style={{float: 'right'}}>
              <IconButton aria-label="renew" onClick={this.reload} style={{ outline: 'none'}}> 
                  <Icon>
                    autorenew
                  </Icon>
              </IconButton>
              </CardActions>
            }>
                <Typography variant="title">
                {this.processText()}
                </Typography>
            </RandomTextCard>
              <TextArena randomText={this.processText().split(' ')} textRef={this.textarearef}/>
              </div>
        </div>
      );
    } else {
      return(
        <div>Loading..</div>
      )
    }
  }
}

function mapdispatch(dispatch) {
  return bindActionCreators({gettext}, dispatch);
}

function mapstate({randomtext}) {
  return {randomtext};
}

export default connect(mapstate,mapdispatch)(App);
