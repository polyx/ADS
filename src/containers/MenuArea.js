import React from 'react';
import {Nav, NavDropdown, NavItem, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export default class MenuArea extends React.Component {
  render() {
    return(
      <Nav pullRight>
        <NavDropdown pullRight noCaret id="dropDownMenu" title={<Glyphicon glyph="menu-hamburger"/>}>
          <NavItem>
            <p>Info</p>
            <Link to="/admin">Admin</Link>
          </NavItem>
      </NavDropdown>
     </Nav>     
    );
  }
}

MenuArea.PropTypes = {
  visibleAreas: PropTypes.object.isRequired,
};