import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, PanelGroup, Panel, ListGroup, ListGroupItem, Button, ButtonToolbar} from "react-bootstrap";
import moment from 'moment';
import {loadQuery} from '../api';
import {isUserAdmin} from '../globals/UserInfo';
import {Link} from "react-router-dom";

export default class InfoSheetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 0,
      activePanelKey: 0,
      tabObj: [],
      tabDataSets: [],
      tabOrgUnitGroups: [],
      tabDataElems: [],           // tabX - [[elemId, elemName, val], [elemId, elemName, val]]
    }
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleNewSelectedOrg = this.handleNewSelectedOrg.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOrg !== null) {
      if ((this.state.tabObj[this.state.activeTabKey] === undefined) ||
      (this.state.tabObj[this.state.activeTabKey].id !== nextProps.selectedOrg.id)) {
        this.handleNewSelectedOrg(nextProps.selectedOrg);
      } 
    }
  }


  async handleNewSelectedOrg(org) {
    // fetching orgunit data
    let orgUnitObj = await loadQuery('organisationUnits/' + org.id + '.json');
    let tabObj = this.state.tabObj;
    tabObj[this.state.activeTabKey] = orgUnitObj;
    // fetching dataSets
    let ids = ''.concat(orgUnitObj.dataSets.map((dataSet)=>{return dataSet.id}));
    let dataSets = await loadQuery(`/dataSets.json?paging=false&filter=id:in:[${ids}]&fields=id,displayName`);
    dataSets = dataSets.dataSets;
    let tabDataSets = this.state.tabDataSets;
    tabDataSets[this.state.activeTabKey] = dataSets;
    // fetching organisationUnitGroups
    ids = ''.concat(orgUnitObj.organisationUnitGroups.map((group)=>{return group.id}));
    let orgUnitGroups = await loadQuery(`/organisationUnitGroups.json?paging=false&filter=id:in:[${ids}]&fields=id,displayName`);
    orgUnitGroups = orgUnitGroups.organisationUnitGroups;
    let tabOrgUnitGroups = this.state.tabOrgUnitGroups;
    tabOrgUnitGroups[this.state.activeTabKey] = orgUnitGroups;
    // fetching data elements, indicators, year
    let dataStorDataElems = await loadQuery(`dataStore/ads_data_elems/${org.id}`);    
    let dataElems;
    if (dataStorDataElems !== null) {
      dataElems = await this.fetchAnalyticsData(dataStorDataElems, org.id);
    } else {
      dataElems = null;
    }
    let tabDataElems = this.state.tabDataElems;
    tabDataElems[this.state.activeTabKey] = dataElems;


    this.setState({
      tabObj: tabObj,
      tabDataSets: tabDataSets,
      tabOrgUnitGroups: tabOrgUnitGroups,
      tabDataElems: tabDataElems,
    });
  }

  async fetchAnalyticsData(dStorDataElems, orgId){
    let ou = orgId;
    let pe = moment(new Date()).format("YYYY");
    let dx = Object.keys(dStorDataElems).join(';');
    let analytics = await loadQuery(`26/analytics?paging=false&dimension=dx:${dx}&dimension=pe:${pe}&dimension=ou:${ou}`);
    let dataElemsData;
    if (analytics !== null) {
      dataElemsData = analytics.rows.map((row) => {
        let arr = [];
        arr.push(row[0]);
        arr.push(row[3]);
        arr.push(analytics.metaData.items[row[0]].name);
        return arr;
      });
    } else {
      dataElemsData = null;
    }
    return dataElemsData;
  }


  handlePanelSelect(panelKey) {
    console.log(panelKey);
  }


  renderInfo(tabKey) {
    let obj = this.state.tabObj[tabKey];

    return (
      <PanelGroup style={{fontSize:'1em'}} activeKey={this.state.activePanelKey} onSelect={this.handlePanelSelect}>
        <Panel collapsible defaultExpanded={true} header="Basic Information" eventKey="0">{this.renderPanelBasic(tabKey)}</Panel>
        <Panel collapsible defaultExpanded={false} header="Data Sets" eventKey="1">{this.renderPanelDataSets(tabKey)}</Panel>
        <Panel collapsible defaultExpanded={false} header="Organization Unit Groups" eventKey="2">{this.renderPanelOrgGroups(tabKey)}</Panel>
        <Panel collapsible defaultExpanded={false} header="Data Elements" eventKey="3">{this.renderPanelDataElems(tabKey)}</Panel>
        {obj && (<Panel collapsible header="Manage" eventKey="6">{this.renderManagePanel(obj)}</Panel>)}
      </PanelGroup>
    );
  }

  renderManagePanel(obj){
    return(
      <ButtonToolbar>
        {isUserAdmin ? <Link to={"/admin/"+obj.id}><Button>Manage</Button></Link> : null}
        <Button disabled>Propose Changes</Button>
      </ButtonToolbar>
    );
  }

  renderPanelBasic(tabKey) {
    let obj = this.state.tabObj[tabKey];
    let displayName = (obj !== undefined) ? obj.displayName : null;
    let level = (obj !== undefined) ? obj.level : null;
    let created = (obj !== undefined) ? (obj.created ? moment(obj.created).format("YYYY-MM-DD") : null) : null;
    let lastUpdated = (obj !== undefined) ? (obj.created ? moment(obj.lastUpdated).format("YYYY-MM-DD") : null) : null;
    let openingDate = (obj !== undefined) ? (obj.created ? moment(obj.openingDate).format("YYYY-MM-DD") : null) : null;
    return (
      <ListGroup fill>
        <ListGroupItem><b>Name:</b> {displayName}</ListGroupItem>
        <ListGroupItem><b>Level:</b> {level}</ListGroupItem>
        <ListGroupItem><b>Creacted:</b> {created}</ListGroupItem>
        <ListGroupItem><b>Opening Date:</b> {openingDate}</ListGroupItem>
        <ListGroupItem><b>Last Updated:</b> {lastUpdated}</ListGroupItem>        
      </ListGroup>
    );
  }

  renderPanelOrgGroups(tabKey) {
    let groups = this.state.tabOrgUnitGroups[tabKey];
    let list = groups ?
      groups.map((group,i)=>{return (<ListGroupItem key={i}>{group.displayName}</ListGroupItem>)}) 
      : null;
    return (
      <ListGroup fill>  
       {list}
      </ListGroup>
    );
  }

  renderPanelDataSets(tabKey) {
    let dataSets = this.state.tabDataSets[tabKey];
    let list = dataSets ? 
      dataSets.map((dataSet,i)=>{return (<ListGroupItem key={i}>{dataSet.displayName}</ListGroupItem>)}) 
      : null;
    return (
      <ListGroup fill>
        {list}          
     </ListGroup>
    );
  }

  renderPanelDataElems(tabKey) {
    let dataElems = this.state.tabDataElems[tabKey];
    let list = dataElems ?
      dataElems.map((dataElems,i)=>{return (<ListGroupItem key={i}>{dataElems[2]}: <span style={{float: 'right'}}>{dataElems[1]}</span></ListGroupItem>)})
      : null;
    return (
      <ListGroup fill>
        {list}          
      </ListGroup>
    );
  }


  handleTabSelect(tabKey) {
    this.setState({activeTabKey: tabKey});
    if (this.state.tabObj[tabKey] !== undefined) {
      this.props.passNewSelectedOrgId(this.state.tabObj[tabKey].id);
    }
  }

  render() {
    //let styleTab = {padding: '1px, 1px, 1px 1px'};
    return(
      <div>
        <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabSelect} id="controlled-tab">
          <Tab eventKey={0} title={this.state.tabObj[0] ? this.state.tabObj[0].name : 'Tab1'}> {this.renderInfo(0)} </Tab>
          <Tab eventKey={1} title={this.state.tabObj[1] ? this.state.tabObj[1].name : 'Tab2'}> {this.renderInfo(1)} </Tab>
          <Tab eventKey={2} title={this.state.tabObj[2] ? this.state.tabObj[2].name : 'Tab3'}> {this.renderInfo(2)} </Tab>          
        </Tabs>        
      </div>
    );    
  }
}

InfoSheetArea.propTypes = {
  selectedOrg: PropTypes.object,
  passNewSelectedOrgId: PropTypes.func.isRequired,
}