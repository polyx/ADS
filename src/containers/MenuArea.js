import React from 'react';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class MenuArea extends React.Component {
  render() {
    return(
      <NavDropdown pullRight noCaret title={<Glyphicon glyph="menu-hamburger"/>}>
      <NavItem>
                      
      </NavItem>
     </NavDropdown>        
    );
  }
}