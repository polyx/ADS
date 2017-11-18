import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';


export default class AppBarArea extends Component {
  render() {
    return (
      <AppBar 
        title={<SearchField/>}
      />
    );
  }
}


class SearchField extends Component {
  state = {
    dataSource: [],
  }

  handleUpdateInput = (e) => {

  }

  handleNewRequest = (value) => {
    console.log(value)
  }

  render() {
    return (
      <AutoComplete
          hintText="Search"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
      />
    );
  }
}
