import React from 'react';
import {Nav, NavDropdown, NavItem, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {isUserAdmin} from '../globals/UserInfo';

export default class HeaderMenu extends React.Component {
  render() {
    return(
      <Nav pullRight>
        <NavDropdown pullRight noCaret id="dropDownMenu" title={<Glyphicon glyph="menu-hamburger"/>}>
          <NavItem>
            <p>Info</p>
          </NavItem>
          <NavItem>
            {isUserAdmin ? <Link to="/admin">Admin</Link> : null}
          </NavItem>
      </NavDropdown>
     </Nav>     
    );
  }
}

HeaderMenu.propTypes = {
  visibleAreas: PropTypes.object.isRequired,
};