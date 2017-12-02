import React from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'react-bootstrap';

export default class InfoSheetArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 1,
      tabsOrgObj: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOrgId === null) {
      return;
    }
    //TODO:stop here
    // if ((this.state.tabsOrgObj[this.state.activeTabKey] === undefined) | 
    //     (this.state.tabsOrgObj[this.state.activeTabKey].id !== nextProps.id)) {
    //   console.log(nextProps.selectedOrgId);
    // } 

  }

  handleTabSelect(key) {
    this.setState({actTab: key})
  }

  render() {
    return(
      <div>
        <Tabs activeKey={this.state.key} id="controlled-tab">
          <Tab eventKey={1} title="tab1"> OrgUnit1 </Tab>
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