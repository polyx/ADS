import React from 'react';
import {Navbar} from 'react-bootstrap';
import HeaderMenu from './HeaderMenu';
import HeaderSearch from './HeaderSearch';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {local, url} from "../globals/BaseUrl";

export default class HeaderArea extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={(!local && url+"/index.html") || "/"}>
              <img src={url+"/dhis2.png"} alt="dhis2"/>
            </Link>

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