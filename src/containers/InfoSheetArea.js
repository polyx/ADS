import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab,PanelGroup, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import moment from 'moment';
import {loadQuery} from '../components/LoadOrgUnits';

export default class InfoSheetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 0,
      noSrchTabKey: 1,
      activePanelKey: 0,
      tabsObj: [],
    }
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleNewSelectedOrg = this.handleNewSelectedOrg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('info ' + nextProps.selectedOrg);
    if ((this.state.tabsObj[this.state.noSrchTabKey] === undefined) ||
        (this.state.tabsObj[this.state.noSrchTabKey].id !== nextProps.selectedOrg.id)) {
      this.handleNewSelectedOrg(nextProps.selectedOrg);
    } 
  }


  async handleNewSelectedOrg(org) {
    //console.log(org);
    let orgUnitObj = await loadQuery('organisationUnits/' + org.id + '.json');
    //console.log(orgUnitObj);
    let tabsObj = this.state.tabsObj;
    tabsObj[this.state.noSrchTabKey] = orgUnitObj;
    this.setState({
      tabsObj: tabsObj
    });
  }

  handlePanelSelect(panelKey) {

  }


  renderInfo(tabKey) {
    let obj = this.state.tabsObj[tabKey];

    return (
      <PanelGroup style={{fontSize:'1em'}} activeKey={this.state.activePanelKey} onSelect={this.handlePanelSelect}>
        <Panel collapsible defaultExpanded header="Basic Information" eventKey="1">{this.renderPanelBasic(obj)}</Panel>
        <Panel collapsible header="Groups" eventKey="2">{this.renderPanelGroups(obj)}</Panel>
        <Panel collapsible header="Data Sets" eventKey="3">{this.renderPanelDataSets(obj)}</Panel>
        <Panel collapsible header="Users" eventKey="4">{this.renderPanelUsers(obj)}</Panel>
        <Panel collapsible header="Parent/Children" eventKey="5">{this.renderPanelParents(obj)}</Panel>
      </PanelGroup>
    );
  }

  renderPanelBasic(obj) {
    let name = (obj !== undefined) ? obj.name : null;
    let shortName = (obj !== undefined) ? obj.shortName : null;
    let displayName = (obj !== undefined) ? obj.displayName : null;
    let level = (obj !== undefined) ? obj.level : null;
    let created = (obj !== undefined) ? (obj.created ? moment(obj.created).format("YYYY-MM-DD") : null) : null;
    let lastUpdated = (obj !== undefined) ? (obj.created ? moment(obj.lastUpdated).format("YYYY-MM-DD") : null) : null;
    let openingDate = (obj !== undefined) ? (obj.created ? moment(obj.openingDate).format("YYYY-MM-DD") : null) : null;
    return (
      <ListGroup >
        <ListGroupItem header="Name">{name}</ListGroupItem>
        <ListGroupItem header="Short Name">{shortName}</ListGroupItem>
        <ListGroupItem header="Display Name">{displayName}</ListGroupItem>
        <ListGroupItem header="Level">{level}</ListGroupItem>
        <ListGroupItem header="Created">{created}</ListGroupItem>
        <ListGroupItem header="Opening Date">{openingDate}</ListGroupItem>
        <ListGroupItem header="Last Updated">{lastUpdated}</ListGroupItem>        
      </ListGroup>
    );
  }

  renderPanelGroups() {
    return (
      <ListGroup >
     </ListGroup>
    );
  }

  renderPanelDataSets() {
    return (
      <ListGroup >
     </ListGroup>
    );
  }

  renderPanelUsers() {
    return (
      <ListGroup >
     </ListGroup>
    );
  }

  renderPanelParents() {
    return (
      <ListGroup >
     </ListGroup>
    );
  }

  renderSearch() {
    return(
      <div>
      </div>
    );
  }

  handleTabSelect(tabKey) {
    this.setState({activeTabKey: tabKey});
    if (tabKey !== 0) {
      this.setState({noSrchTabKey: tabKey});
    } 
  }

  render() {
    return(
      <div>
        <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabSelect} id="controlled-tab">
          <Tab eventKey={0} title="Search"> {this.rendeSearch} </Tab>
          <Tab eventKey={1} title={this.state.tabsObj[1] ? this.state.tabsObj[1].name : 'Tab1'}> {this.renderInfo(1)} </Tab>
          <Tab eventKey={2} title={this.state.tabsObj[2] ? this.state.tabsObj[2].name : 'Tab2'}> {this.renderInfo(2)} </Tab>
          <Tab eventKey={3} title={this.state.tabsObj[3] ? this.state.tabsObj[3].name : 'Tab3'}> {this.renderInfo(3)} </Tab>          
        </Tabs>
        
      </div>
    );    
  }
}

InfoSheetArea.PropTypes = {
  // selectedOrg: PropTypes.o,
}