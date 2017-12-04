import React from 'react';
import {Navbar} from 'react-bootstrap';
import {baseUrl} from '../components/BaseUrl';
import HeaderMenuArea from './HeaderMenuArea';
import HeaderSearchArea from './HeaderSearchArea';
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
          <HeaderSearchArea allUnits={this.props.allUnits} handlNewSearchSet={this.props.handlNewSearchSet}/>
          <HeaderMenuArea visibleAreas={this.props.visibleAreas}/>
        </Navbar.Collapse>
      </Navbar>      
    );
  }
}

HeaderArea.PropTypes = {
  // for MenuArea
  visibleAreas: PropTypes.object.isRequired,
  // for searchArea
  allUnits: PropTypes.array.isRequired,
  handlNewSearchSet: PropTypes.func.isRequired,
}