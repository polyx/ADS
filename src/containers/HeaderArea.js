import React from 'react';
import {Navbar} from 'react-bootstrap';
import {baseUrl} from '../components/BaseUrl';
import MenuArea from './MenuArea';
import SearchArea from './SearchArea';
import PropTypes from 'prop-types';

export default class HeaderArea extends React.Component {

  constructor() {
    super();
    this.state = {
      homeUrl: baseUrl.replace('/api',''),
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
              <a href={this.state.homeUrl}> 
                <img src="./dhis2.png" alt="dhis2"/> 
              </a>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <SearchArea tree={this.props.tree} handleSearchRes={this.props.processSearchRes}/>
          <MenuArea visibleAreas={this.props.visibleAreas}/>
        </Navbar.Collapse>
      </Navbar>      
    );
  }
}

SearchArea.PropTypes = {
  // for MenuArea
  visibleAreas: PropTypes.object.isRequired,
  // for searchArea
  tree: PropTypes.array.isRequired,
  processSearchRes: PropTypes.func.isRequired,
}