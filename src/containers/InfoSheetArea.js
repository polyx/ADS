import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';
import {loadQuery} from '../components/LoadOrgUnits';

export default class InfoSheetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 1,
      tabsObj: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('info ' + nextProps.selectedOrgId);
    // if (nextProps.selectedOrgId !== null && nextProps.selectedOrgId !== this.props.selectedOrgId) {
    //   this.handleNewSelectedOrgId(nextProps.selectedOrgId);
    // }
    //TODO:stop here
    if ((this.state.tabsObj[this.state.activeTabKey] === undefined) ||
        (this.state.tabsObj[this.state.activeTabKey].id !== nextProps.selectedOrgId)) {
      this.handleNewSelectedOrgId(nextProps.selectedOrgId);
    } 

  }

  handleTabSelect(key) {
    this.setState({actTab: key})
  }

  async handleNewSelectedOrgId(id) {
    if (this.state.tabsObj[this.state.activeTabKey] === undefined) {
      console.log('tabObj underfined');
    } else {
      console.log(this.state.tabsObj[this.state.activeTabKey].id);      
    }
    let orgUnitObj = await loadQuery('organisationUnits/' + id + '.json');
    let tabsObj = this.state.tabsObj;
    tabsObj[this.state.activeTabKey] = orgUnitObj;
    console.log(orgUnitObj);
    this.setState({
      tabsObj: tabsObj
    });
  }

  renderTab1() {
    return(
      <div>
        {/* {this.state.tabsObj[this.state.activeTabKey]} */}
      </div>
    );
  }

  render() {
    return(
      <div>
        <Tabs activeKey={this.state.key} id="controlled-tab">
          <Tab eventKey={1} title="tab1"> {this.renderTab1()} </Tab>
          <Tab eventKey={2} title="tab2"> OrgUnit2 </Tab>
          <Tab eventKey={3} title="tab3"> OrgUnit3 </Tab>
        </Tabs>
      </div>
    );    
  }
}

InfoSheetArea.PropTypes = {
  // tree: PropTypes.array.isRequired,
  selectedOrgId: PropTypes.number,
}