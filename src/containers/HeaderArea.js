import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {baseUrl} from '../components/BaseUrl';
import MenuArea from './MenuArea';

export default class HeaderArea extends React.Component {
  

  render() {
    let homeUrl = baseUrl.replace('/api','');
    console.log(homeUrl);
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
              <a href={homeUrl}> 
                <img src="./dhis2.png" alt="dhis2"/> 
              </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
            <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">
              <Glyphicon glyph="search"/>
            </Button>
          </Navbar.Form>
          <Nav pullRight>
            <MenuArea />
          </Nav>
        </Navbar.Collapse>
      </Navbar>        
    );
  }
  }