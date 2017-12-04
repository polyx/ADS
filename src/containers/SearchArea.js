import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import SearchTree from './SearchTree';
import SearchList from './SearchList';

export default class searchArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 0,
    }
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSet !== this.props.searchSet) {
      this.handleNewSearchSet(nextProps.searchSet);
    }
  }


  handleTabSelect(tabKey) {
    this.setState({activeTabKey: tabKey});
  }


  handleNewSearchSet(newSet) {
    this.setState({activeTabKey: 1});    
  
  }

  renderTabTree() {
    return(
      <SearchTree
        allUnits={this.props.allUnits}
        levelOne={this.props.levelOne}
        selectedOrg={this.props.selectedOrg}
        searchSet={this.props.searchSet}
        passNewSelectedOrgId={this.props.handlNewSelectedOrgId}
      />
    );
  }


  renderTabList() {
    return(
      <SearchList
        searchSet={this.props.searchSet}
        passNewSelectedOrgId={this.props.handlNewSelectedOrgId}
      />
    );
  }


  render() {
    // let styleTab = {color: 'red', paddingTop: '1px'};
    let styleTab = {};
    return(
      <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabSelect} id="controlled-tab" justified style={styleTab}>
        <Tab eventKey={0} title="Tree"> {this.renderTabTree()} </Tab>
        <Tab eventKey={1} title="List"> {this.renderTabList()} </Tab>
      </Tabs>  
    );
  }
}

searchArea.propTypes = {
  allUnits: PropTypes.array.isRequired,
  levelOne: PropTypes.array.isRequired,
  searchSet: PropTypes.array.isRequired,
  selectedOrg: PropTypes.object,
  handlNewSelectedOrgId: PropTypes.func.isRequired,
}