import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  // height: 100,
  // width: 100,
  margin: 3,
  textAlign: 'center',
  display: 'inline-block',
};


export default class ContentArea extends Component {
  render() {
    return(
      <div>
        <Paper style={style} zDepth={5} />
      </div>
    );
  }
}

