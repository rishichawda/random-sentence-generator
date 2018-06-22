import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gettext } from '../actions';
import Arena from './Arena';
import RandomTextCard from './RandomTextCard';
import Typography from '@material-ui/core/Typography';

class App extends Component {

  constructor(props) {
    super(props);
    this.text = []
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

  componentWillMount() {
    this.props.gettext();
  }

  render() {
    if(this.props.randomtext[0]){
      return (
        <div className="container bg-light h-50">
            <RandomTextCard randomText={this.text}>
                <Typography variant="title">
                {this.processText()}
                </Typography>
            </RandomTextCard>
            <p className="lead">Type here : </p>
              <Arena randomText={this.text}/>
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
