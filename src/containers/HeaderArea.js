import React from 'react';
import {Navbar} from 'react-bootstrap';
import {baseUrl} from '../globals/BaseUrl';
import HeaderMenu from './HeaderMenu';
import HeaderSearch from './HeaderSearch';
import PropTypes from 'prop-types';

export default class HeaderArea extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
              <a href={baseUrl.replace('/api','')}> 
                <img src="./dhis2.png" alt="dhis2"/> 
              </a>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        {this.props.visibleAreas &&
        <Navbar.Collapse>
          <HeaderSearch allUnits={this.props.allUnits} handlNewSearchSet={this.props.handlNewSearchSet}/>
          <HeaderMenu visibleAreas={this.props.visibleAreas}/>
        </Navbar.Collapse>}
      </Navbar>      
    );
  }
}

HeaderArea.propTypes = {
  visibleAreas: PropTypes.object,
  allUnits: PropTypes.array,
  handlNewSearchSet: PropTypes.func,
}