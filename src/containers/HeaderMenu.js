import React from 'react';
import {Nav, NavDropdown, NavItem, Glyphicon, Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import moment from 'moment';
import {isUserAdmin, userObj, userGroups, userOrgUnits} from '../globals/UserInfo';

export default class HeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  renderModal() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>User information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 align="center">User <em>{userObj.userCredentials.username}</em></h4>
            <p> <b>Name:</b> {userObj.name}</p>
            <p> <b>Employer:</b> {userObj.employer} </p>
            <p> <b>e-mail:</b> {userObj.email}</p>
            <p> <b>Education:</b> {userObj.education}</p>
            <p> <b>Job-title:</b> {userObj.jobTitle}</p>
            <p> <b>Interests:</b> {userObj.interests}</p>
            <p> <b>Languages:</b> {userObj.languages}</p>
            <p> <b>Birthday:</b> {(userObj.birthday ? moment(userObj.birthday).format("YYYY-MM-DD") : null)}</p>
            <p> <b>Created:</b> {(userObj.created ? moment(userObj.birthday).format("YYYY-MM-DD") : null)}</p>
            <h4 align="center"> Part of Organizatioin Units</h4>
            {userGroups.map((group,i)=>{return (<p key={i}>{group.displayName}</p>)})}
            <h4 align="center"> Part of User Groups</h4>
            {userOrgUnits.map((group,i)=>{return (<p key={i}>{group.displayName}</p>)})}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    return(
      <div>
      <Nav pullRight>
        <NavDropdown pullRight noCaret id="dropDownMenu" title={<Glyphicon glyph="menu-hamburger"/>}>
          <NavItem onClick={this.openModal.bind(this)}>
            <p>User Info</p>
          </NavItem>
          <NavItem>
            {isUserAdmin ? <Link to="/admin">Admin</Link> : null}
          </NavItem>
      </NavDropdown>                
     </Nav>
    {this.renderModal()} 
    </div>
    );
  }
}


HeaderMenu.propTypes = {
  visibleAreas: PropTypes.object.isRequired,
};