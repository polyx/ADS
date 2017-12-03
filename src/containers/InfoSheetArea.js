import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
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
    console.log(id);
    let orgUnitObj = await loadQuery('organisationUnits/' + id + '.json');
    console.log(orgUnitObj);
    let tabsObj = this.state.tabsObj;
    tabsObj[this.state.activeTabKey] = orgUnitObj;
    this.setState({
      tabsObj: tabsObj
    });
  }

  renderForm() {
    let obj = this.state.tabsObj[this.state.activeTabKey];
    return( 
      <Form>
        <FormGroup bsSize="sm">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            readOnly            
            type="text"
            // value={this.state.tabsObj[this.state.activeTabKey].name}
            placeholder={(obj !== undefined) ? obj.name : null}
          />
        </FormGroup>
      </Form>
    );
  }

  render() {
    return(
      <div>
        <Tabs activeKey={this.state.key} id="controlled-tab">
          <Tab eventKey={1} title={this.state.tabsObj[1] ? this.state.tabsObj[1].name : 'Tab1'}> {this.renderForm()} </Tab>
          <Tab eventKey={2} title={this.state.tabsObj[2] ? this.state.tabsObj[2].name : 'Tab2'}> {this.renderForm()} </Tab>
          <Tab eventKey={3} title={this.state.tabsObj[3] ? this.state.tabsObj[3].name : 'Tab3'}> {this.renderForm()} </Tab>
          {/* <Tab eventKey={2} title="tab2"> OrgUnit2 </Tab>
          <Tab eventKey={3} title="tab3"> OrgUnit3 </Tab> */}
        </Tabs>
      </div>
    );    
  }
}

InfoSheetArea.PropTypes = {
  selectedOrgId: PropTypes.number,
}